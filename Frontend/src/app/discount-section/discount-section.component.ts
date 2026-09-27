import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-discount-section',
  imports: [CommonModule],
  templateUrl: './discount-section.component.html',
  styleUrl: './discount-section.component.css'
})
export class DiscountSectionComponent implements OnInit {
  products: any[] = [];
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.productService.getDiscountedProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.toastService.error('Failed to load discounted products')
    });
  }

  getOriginalPrice(product: any): number {
    return product.price / (1 - product.discountPercentage / 100);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`Added ${product.name} to cart!`);
  }
}
