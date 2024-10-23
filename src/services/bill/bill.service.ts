import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBill } from '../../interfaces/i-Bill';
@Injectable({
  providedIn: 'root',
})
export class BillService {

  constructor(private http: HttpClient) {}

  // Phương thức để lấy danh sách hóa đơn với các tham số truyền vào
  getBills(
    pageIndex: number,
    pageSize: number,
    dateStart: string | null,
    dateEnd: string | null,
    status: number | null,
    keyword: string | null,
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());
  
    if (dateStart) {
      params = params.set('DateStart', dateStart);
    }
    
    if (dateEnd) {
      params = params.set('DateEnd', dateEnd);
    }
    
    if (status !== null ) {
      params = params.set('status', status.toString());
    }
    if (keyword !== null) {
      params = params.set('keyword', keyword);
    }
    console.log(params.toString()); // Xem các tham số trước khi gửi
    // Gọi API bằng phương thức GET
    return this.http.get(`${environment.apiUrl}Bills`, { params });
  }
  
  insertBills(bills:IBill):Observable<IBill> {
    return this.http.post<IBill>(`${environment.apiUrl}Bills`, bills);
  }

  GetBillIdCustomer(idcustomer:number):Observable<IBill[]> {
    return this.http.get<IBill[]>(`${environment.apiUrl}Bills/customer/${idcustomer}`);
  }

  getTotalBill(dateStart: string | null, dateEnd: string | null, status: number | null,keyword:string|null): Observable<number> {
    let params = new HttpParams();

    if (dateStart) {
        params = params.set('DateStart', dateStart);
    }
    if (dateEnd) {
        params = params.set('DateEnd', dateEnd);
    }
    if (status !== null ) {
      params = params.set('status', status.toString());
    }
    if (keyword !== null) {
      params = params.set('keyword', keyword);
  }

    return this.http.get<number>(`${environment.apiUrl}Bills/GetTotalBill`, { params });
}

}
