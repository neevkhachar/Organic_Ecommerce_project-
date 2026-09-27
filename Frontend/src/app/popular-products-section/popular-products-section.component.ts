import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-popular-products-section',
  imports: [CommonModule],
  templateUrl: './popular-products-section.component.html',
  styleUrl: './popular-products-section.component.css'
})
export class PopularProductsSectionComponent implements OnInit {
  products: any[] = [];
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    // Load all products and sort by salesCount to show "popular"
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data
          .sort((a: any, b: any) => b.salesCount - a.salesCount)
          .slice(0, 6);
      },
      error: () => this.toastService.error('Failed to load popular products')
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`Added ${product.name} to cart!`);
  }
}
