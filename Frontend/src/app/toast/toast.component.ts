import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts$ | async" 
           class="toast-message" 
           [ngClass]="toast.type">
        <span>{{ toast.message }}</span>
        <button class="close-btn" (click)="toastService.remove(toast.id)">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .toast-message {
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 300px;
      animation: slideIn 0.3s ease-out;
      color: white;
      font-weight: 500;
    }
    
    .toast-message.success {
      background-color: #38a169;
    }
    
    .toast-message.error {
      background-color: #e53e3e;
    }
    
    .toast-message.info {
      background-color: #3182ce;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.8;
      margin-left: 15px;
    }
    
    .close-btn:hover {
      opacity: 1;
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
