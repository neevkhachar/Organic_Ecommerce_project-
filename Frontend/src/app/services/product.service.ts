import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getFeaturedProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { isFeatured: 'true' } });
  }

  getBestSellingProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { isBestSeller: 'true' } });
  }

  getJustArrivedProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { isJustArrived: 'true' } });
  }

  getDiscountedProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { hasDiscount: 'true' } });
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { category } });
  }
}
