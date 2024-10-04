import { Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/i-Customers';
import { ValidationService } from '../validation/validation.service';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor( 
    private http: HttpClient,
    private validation:ValidationService,) { }
  
    getCustomers(pageIndex: number, pageSize: number, keyword?: string): Observable<ICustomer[]> {
      let params = new HttpParams()
        .set('PageIndex', pageIndex.toString())
        .set('PageSize', pageSize.toString());
    
      // Nếu keyword không trống, thêm tham số 'Keyword' vào URL
      if (keyword && keyword.trim()) {
        params = params.set('Keyword', keyword);
      }
    
      return this.http.get<ICustomer[]>(`${environment.apiUrl}Customers/GetCustomers`, { params });
    }

      getTotalCustomers(keyword?: string): Observable<number> {
      let params = new HttpParams();
      if (keyword) {
        params = params.set('keyword', keyword);
      }
      return this.http.get<number>(`${environment.apiUrl}Customers/GetTotalCustomers`, { params });
    }
    deleteCustomer(id: string): Observable<void> {
      return this.http.delete<void>(`${environment.apiUrl}Customers/Delete/${id}`);
    }

    insertCustomer(formData: ICustomer): Observable<void> {
      return this.http.post<void>(`${environment.apiUrl}/Customers/Create`, formData);
    }
    insertlogin(email: string, Password:string): Observable<void> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { email: email,Password: Password };
      return this.http.post<void>(`${environment.apiUrl}/Customers/login`,body);
    }
    updateCustomer(customer: ICustomer): Observable<ICustomer> {
      return this.http.put<ICustomer>(`${environment.apiUrl}Customers/Update`, customer);
    }

    getCustomerId(customerId: number): Observable<ICustomer> {
      return this.http.get<ICustomer>(`${environment.apiUrl}Customers/GetById/${customerId}`);
    }
    login(email: string, password: string) {
      this.insertlogin(email, password).subscribe({
        next: () => {
          localStorage.setItem('isAuthenticated', 'true');
        },
        error: () => {
          localStorage.removeItem('isAuthenticated');
        }
      });
    }
}
