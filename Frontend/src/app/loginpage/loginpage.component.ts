import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginpage', 
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isLoading = false;

  loginform: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loginsubmit(val: any) {
    if (this.loginform.invalid) {
      this.toastService.error("Please fill all required fields correctly.");
      this.loginform.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login(val).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.success("Login successful!");
        this._router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error(err.error?.msg || "Login failed. Please try again.");
      }
    });
  }
}
