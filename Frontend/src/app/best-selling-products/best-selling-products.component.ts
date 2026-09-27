import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-best-selling-products',
  imports: [CommonModule],
  templateUrl: './best-selling-products.component.html',
  styleUrl: './best-selling-products.component.css'
})
export class BestSellingProductsComponent implements OnInit {
  products: any[] = [];
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.productService.getBestSellingProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.toastService.error('Failed to load best selling products')
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`Added ${product.name} to cart!`);
  }
}
