import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-featured-products-section',
  imports: [CommonModule],
  templateUrl: './featured-products-section.component.html',
  styleUrl: './featured-products-section.component.css'
})
export class FeaturedProductsSectionComponent implements OnInit {
  products: any[] = [];
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.toastService.error('Failed to load featured products')
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`Added ${product.name} to cart!`);
  }
}
