import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isLoggedIn = false;
  currentUser: any = null;
  cartCount = 0;

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });

    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  logout() {
    this.authService.logout();
    this.toastService.info("Logged out successfully");
    this.router.navigate(['/home']);
  }
}
