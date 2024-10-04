import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http: HttpClient) { }
  // Hàm gửi OTP
  sendOtp(toEmail: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { toEmail: toEmail };
    return this.http.post(`${environment.apiUrl}OTP/send-otp`, body, { headers });
  }
  verifyEmail(email: string,otp: string)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email, otp: otp };
    return this.http.post(`${environment.apiUrl}OTP/verify-email`, body, { headers });  
  }
  updatemarkOtpUsed(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/mark-otp-used/${encodeURIComponent(email)}`, {});
  }
  OTPEmail(email: string)
  {
    this.sendOtp(email).subscribe({
      next: () => {
        // Xử lý khi xóa thành công
        console.log('Kiểm tra email của bản để nhận mã xác thực');
      },
      error: (err) => {
        // Xử lý lỗi khi xóa không thành công
        console.error('Lỗi gửi mã xác thực:', err);
      },
    });
  }
  CheckOTPEmail(Email: string,OTPEmail: string)
  {
    this.verifyEmail(Email,OTPEmail).subscribe({
      next: () => {
        // Xử lý khi xóa thành công
        console.log('Xác thực email thành công');
      },
      error: (err) => {
        // Xử lý l��i khi xóa không thành công
        console.error('Lỗi xác thực email:', err);
      },
    });
  }
  markOtpUsed(email: string)
  {
    this.updatemarkOtpUsed(email).subscribe({
      next: () => {
        // Xử lý khi xóa thành công
        console.log('Đánh dấu OTP đã sử dụng thành công');
      },
      error: (err) => {
        // Xử lý l��i khi xóa không thành công
        console.error('Lỗi đánh dấu OTP đã sử dụng:', err);
      },
    });
  }

  
}
