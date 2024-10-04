  import { Injectable } from '@angular/core';
  import { environment } from '../../environments/environment';
  import { HttpClient , HttpParams } from '@angular/common/http';
  import { IProduct } from '../../interfaces/i-Product';
  import { Observable } from 'rxjs';
  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    constructor(private http: HttpClient) { }
    getProductsAsync(keyword: string | null, Idkindproduct: number | null, pageIndex: number, pageSize: number): Observable<IProduct[]> {
      let params = new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
    
      // Kiểm tra nếu có từ khóa, thì thêm vào HttpParams
      if (keyword && keyword.trim() !== '') {
        params = params.set('keyword', keyword);
      }
    
      // Kiểm tra nếu có Idkindproduct, thì thêm vào HttpParams
      if (Idkindproduct !== null && Idkindproduct !== undefined) {
        params = params.set('Idkindproduct', Idkindproduct.toString());
      }
    
      return this.http.get<IProduct[]>(`${environment.apiUrl}Products/getProduct`, { params });
    }
    
    getTotalProduct(keyword: string, IdKindProduct: number): Observable<number> {
      let params = new HttpParams();
      
      // Thêm tham số keyword nếu có
      if (keyword && keyword.trim() !== '') {
        params = params.set('keyword', keyword);
      }
      
      // Thêm tham số IdKindProduct nếu khác 0
      if (IdKindProduct !== 0) {
        params = params.set('IdKindProduct', IdKindProduct.toString());
      }
    
      // In ra URL đầy đủ để kiểm tra
      const fullUrl = `${environment.apiUrl}Products/GetTotalProduct?${params.toString()}`;
      console.log('GET URL:', fullUrl);
    
      // Gọi API để lấy tổng số sản phẩm
      return this.http.get<number>(fullUrl, { params });
    }
    
    
    getProductById(id: number): Observable<IProduct> {
      return this.http.get<IProduct>(`${environment.apiUrl}Products/GetById/${id}`);
    }

    deleteProductById(id: number): Observable<void> {
      return this.http.get<void>(`${environment.apiUrl}Products/Delete/${id}`);
    }

    addProduct(formData: FormData): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}Products/Insert`, formData);
    }
  }