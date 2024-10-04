import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProductStock } from '../../interfaces/i-ProductStock';
@Injectable({
  providedIn: 'root'
})
export class ProductstockService {

  constructor(private http:HttpClient) { }

 getProductStock():Observable<IProductStock> {
   return this.http.get<IProductStock>(`${environment.apiUrl}ProductStock`);
 }

 insertProductStock(productStock: IProductStock): Observable<IProductStock> {
   return this.http.post<IProductStock>(`${environment.apiUrl}ProductStock`, productStock);
 }
 updateProductStock(productStock: IProductStock): Observable<IProductStock> {
   return this.http.put<IProductStock>(`${environment.apiUrl}ProductStock/${productStock.id}`, productStock);
 }
 deleteProductStock(productStock: IProductStock): Observable<void> {
   return this.http.delete<void>(`${environment.apiUrl}ProductStock/${productStock.id}`);
 }
 getIdProductStock(productStock: IProductStock): Observable<IProductStock> {
   return this.http.get<IProductStock>(`${environment.apiUrl}ProductStock/${productStock.idproduct}`);
 }        

 deleteProductId(Id: string): Observable<IProductStock> {
  return this.http.delete<IProductStock>(`${environment.apiUrl}ProductStock/Product/${Id}`);
}
}
