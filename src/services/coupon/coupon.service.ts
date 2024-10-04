import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICoupons } from '../../../interfaces/i-Coupon';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http:HttpClient) {
    
   }

  getCoupons():Observable<ICoupons> { 
    return this.http.get<ICoupons>(`${environment.apiUrl}coupons`);}

  insertCoupons(coupons: ICoupons): Observable<ICoupons>
  {
    return this.http.post<ICoupons>(`${environment.apiUrl}coupons`, coupons);
  }
  updateCoupons(coupons: ICoupons): Observable<ICoupons>
  {
    return this.http.put<ICoupons>(`${environment.apiUrl}coupons`, coupons);
  }
  getIdCoupons(id: string): Observable<ICoupons>
  {
    return this.http.get<ICoupons>(`${environment.apiUrl}coupons/${id}`);
  }
  deleteCoupons(id: string)
  {
     this.http.delete<ICoupons>(`${environment.apiUrl}coupons/${id}`).subscribe({
      next: () => console.log('Xóa phiếu giảm giá thành công'),
      error: error => console.error('Lỗi xóa phiếu giảm giá', error)
    });
  }

}
