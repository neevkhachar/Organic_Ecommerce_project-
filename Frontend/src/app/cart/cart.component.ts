import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  tax: number = 0;
  total: number = 0;
  isCheckingOut = false;

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.subtotal = this.cartService.getCartTotal();
    this.shipping = this.subtotal > 50 || this.subtotal === 0 ? 0 : 9.99;
    this.tax = this.subtotal * 0.08;
    this.total = this.subtotal + this.shipping + this.tax;
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string, productName: string) {
    this.cartService.removeFromCart(productId);
    this.toastService.info(`Removed ${productName} from cart`);
  }

  checkout() {
    if (!this.authService.isLoggedIn()) {
      this.toastService.error("Please login to place an order.");
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.toastService.error("Your cart is empty.");
      return;
    }

    this.isCheckingOut = true;

    this.orderService.placeOrder('COD').subscribe({
      next: (res) => {
        this.isCheckingOut = false;
        this.cartService.clearCart();
        this.toastService.success("🎉 Order placed successfully!");
      },
      error: (err) => {
        this.isCheckingOut = false;
        this.toastService.error(err.error?.msg || "Failed to place order. Please try again.");
      }
    });
  }
}
