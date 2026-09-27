import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = ['All', 'Groceries', 'Fruits and vegetables', 'Dairy and Eggs', 'Bakery and Bread', 'Chocolates', 'Drinks'];
  selectedCategory: string = 'All';
  isLoading = true;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.error('Failed to load products');
        this.isLoading = false;
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`Added ${product.name} to cart!`);
  }
}
