import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StaticalResultService {

  constructor(private http:HttpClient,) { }
  getBillStatistics(DateStart: string, DateEnd: string): Observable<any> {
    const url = `${environment.apiUrl}Bills/statistics?DateStart=${DateStart}&DateEnd=${DateEnd}`;
    return this.http.get<any>(url);  // Replace 'any' with the appropriate interface if you have one
  }
  getTotalUniqueProducts(DateStart: string, DateEnd: string): Observable<any> {
    const url = `${environment.apiUrl}Bills/GetTotalUniqueProducts?DateStart=${DateStart}&DateEnd=${DateEnd}`;
    return this.http.get<any>(url);  // Replace 'any' with the appropriate interface if you have one
  }
  getInvoiceStatistics(DateStart: string, DateEnd: string): Observable<any> {
    const url = `${environment.apiUrl}Invoice/statisticsInvoice?DateStart=${DateStart}&DateEnd=${DateEnd}`;
    return this.http.get<any>(url);  // Replace 'any' with the appropriate interface if you have one
  }
}
