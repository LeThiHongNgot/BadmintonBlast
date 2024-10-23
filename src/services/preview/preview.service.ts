import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPreview } from '../../interfaces/i-Preview';
@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private http:HttpClient) { }
  getPreviews(): Observable<IPreview[]> {
    return this.http.get<IPreview[]>(`${environment.apiUrl}Previews`);
  }
  getPreview(id:number): Observable<IPreview[]> {
    return this.http.get<IPreview[]>(`${environment.apiUrl}Previews/${id}`);
  }
}
