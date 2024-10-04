import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IOrder } from '../../../interfaces/i-Order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http:HttpClient,) { }

  getOrderId(idBill:string): Observable<IOrder>
  {
    return this.http.get<IOrder>(`${environment.apiUrl}orders/${idBill}`);
  }
  insertOrder(bill:IOrder):Observable<IOrder>
  {
    return this.http.post<IOrder>(`${environment.apiUrl}orders`, bill);
  }
}
