import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  private apiUrl = 'http://localhost:5000/api/v1/cart';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() {
    this.loadCart();
    // Re-sync when user logs in or out
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.syncFromBackend();
      } else {
        this.loadCart();
      }
    });
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next([...this.cartItems]);
      } catch (e) {
        this.cartItems = [];
      }
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  // Sync local cart state from backend
  syncFromBackend() {
    if (!this.authService.isLoggedIn()) return;
    
    this.http.get<any>(this.apiUrl).subscribe({
      next: (cart) => {
        if (cart && cart.items) {
          this.cartItems = cart.items.map((item: any) => ({
            product: {
              _id: item.productId,
              name: item.name,
              description: item.description,
              price: item.price,
              image: item.image || ''
            },
            quantity: item.quantity
          }));
          this.saveCart();
        }
      },
      error: () => {
        // If backend fails, keep local cart
      }
    });
  }

  addToCart(product: any, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.product._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.saveCart();

    // Sync to backend if logged in
    if (this.authService.isLoggedIn()) {
      this.http.post(`${this.apiUrl}/add`, { productId: product._id, quantity }).subscribe();
    }
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
    this.saveCart();

    if (this.authService.isLoggedIn()) {
      this.http.delete(`${this.apiUrl}/remove/${productId}`).subscribe();
    }
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const item = this.cartItems.find(i => i.product._id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();

      if (this.authService.isLoggedIn()) {
        this.http.patch(`${this.apiUrl}/update`, { productId, quantity }).subscribe();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();

    if (this.authService.isLoggedIn()) {
      this.http.delete(`${this.apiUrl}/clear`).subscribe();
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}
