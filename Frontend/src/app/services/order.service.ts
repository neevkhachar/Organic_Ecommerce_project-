import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/v1/orders';
  private http = inject(HttpClient);

  placeOrder(paymentMethod: string = 'COD'): Observable<any> {
    return this.http.post(this.apiUrl, { paymentMethod });
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
