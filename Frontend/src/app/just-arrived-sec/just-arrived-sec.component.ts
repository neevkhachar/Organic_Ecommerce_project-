import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-just-arrived-sec',
  imports: [CommonModule],
  templateUrl: './just-arrived-sec.component.html',
  styleUrl: './just-arrived-sec.component.css'
})
export class JustArrivedSecComponent implements OnInit {
  products: any[] = [];
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.productService.getJustArrivedProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.toastService.error('Failed to load new arrivals')
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`Added ${product.name} to cart!`);
  }
}
