import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private _fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isLoading = false;

  signupform: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    address: this._fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })
  });

  signupsubmit(val: any) {
    if (this.signupform.invalid) {
      this.toastService.error("Please fill all required fields correctly.");
      this.signupform.markAllAsTouched();
      return;
    }

    const termsCheckbox = document.getElementById('terms') as HTMLInputElement;
    if (!termsCheckbox.checked) {
      this.toastService.error("You must agree to the Terms of Service.");
      return;
    }

    this.isLoading = true;

    this.authService.signup(val).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.success("Account created successfully! Please login.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error(err.error?.msg || "Signup failed. Please try again.");
      }
    });
  }
}
