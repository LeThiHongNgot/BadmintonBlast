import {
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaherComponent } from '../../components/heaher/heaher.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { OtpService } from '../../../services/otp/otp.service';
import { ICustomer } from '../../../interfaces/i-Customers';
import { NotificationComponent } from '../../notification/notification.component';
import { CustomersService } from '../../../services/customer/customers.service';
import { ILogin } from '../../../interfaces/i-Customers';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    HeaherComponent,
    FooterComponent,
    NotificationComponent,
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent {
  @Input() loginstatus: boolean = false;
  @Output() closeFormEvent = new EventEmitter<void>();
  constructor(
    private otpservice: OtpService,
    private customerservice: CustomersService,
    private router: Router,
  ) {}
  showRegister = false;
  showlogin = true;
  public message: string = '';
  hidenotify = false;
  otpCode: string = '';
  isOtpDisabled: boolean = true;
  isemail: boolean = false;
  login: ILogin = {
    email: '',
    password: '',
  };
  customer: ICustomer = {
    idcustomer: 0,
    namecustomer: '',
    imageCustomer: '',
    phone: '',
    province: '',
    district: '',
    village: '',
    hamlet: '',
    email: '',
    passwordHash: '',
    status: false,
    role: '',
  };
  isDisabled: boolean = true; // Input bị khóa lúc đầu
  changeColor: boolean = false; // Để thay đổi class CSS
  otp: string = ''; // Biến lưu trữ OTP

  ngOnInit() {}
 
  submitlogin(email: string, password: string)
  {
    this.customerservice.insertlogin(email, password).subscribe((data) => {
      this.message=data;
      console.log(this.message);
      this.hidenotify = true;
      setTimeout(() => {
        this.hidenotify = false; // Ẩn thông báo sau 2 giây
      }, 4000);
      if(this.message=='Đăng nhập thành công')
        {
          this.router.navigate(['/khachhang']);
        }
    });
  }
  checkEmail(email: string): void {
    if (email && email.trim()) {
      this.otpservice.OTPEmail(email).subscribe((response) => {
        this.message = response; // Nhận thông báo từ OTPEmail
        this.hidenotify = true;
        this.isemail=true;
        setTimeout(() => {
          this.hidenotify = false; // Ẩn thông báo sau 2 giây
        }, 4000);
      });
    }
  }

  onOTPChange(value: string): void {
    this.otp = value;

    // Kiểm tra nếu OTP có độ dài 6 ký tự
    if (this.otp.length === 6) {
      this.verifyOTP(this.customer.email, this.otp); // Gọi hàm verifyOTP
    }
  }
  verifyOTP(email: string, otp: string): void {
    this.otpservice.CheckOTPEmail(email, otp).subscribe((response) => {
      this.message = response; // Nhận thông báo từ server
      // Hiển thị thông báo
      this.hidenotify = true;
      setTimeout(() => {
        this.hidenotify = false; // Ẩn thông báo sau 2 giây
      }, 2000);

      // Mở khóa sau 2 giây và thay đổi màu
      setTimeout(() => {
        this.isDisabled = false; // Mở khóa input
        this.changeColor = true; // Thay đổi màu

        // Sau khi thay đổi màu, trả về màu cũ sau 2 giây
        setTimeout(() => {
          this.changeColor = false; // Trả về màu cũ
        }, 2000); // Thời gian duy trì màu mới là 2 giây
      }, 2000); // Bắt đầu mở khóa sau 2 giây
    });
  }

  register(): void {
    console.log(this.customer);
    this.customerservice.insertCustomer(this.customer).subscribe({
      next: () => {
        console.log('Đăng ký thành công!');
        this.message = 'Đăng ký thành công!';
        this.hidenotify = true;
        setTimeout(() => {
          this.hidenotify = false; // Ẩn thông báo sau 2 giây
        }, 2000);
      },
      error: (err) => {
        this.message = 'Lỗi trong quá trình đăng ký';
        this.hidenotify = true;
        setTimeout(() => {
          this.hidenotify = false; // Ẩn thông báo sau 2 giây
        }, 2000);
      },
    });
  }
  closeForm() {

    this.closeFormEvent.emit();
  }

  showRegisterForm() {
    this.showRegister = !this.showRegister;
    this.showlogin = !this.showlogin;
  }

  isEmailStrong(email: string): boolean {
    // Kiểm tra độ dài
    if (email.length < 8) {
      return false;
    }

    // Kiểm tra có chữ hoa
    const hasUpperCase = /[A-Z]/.test(email);
    // Kiểm tra có chữ thường
    const hasLowerCase = /[a-z]/.test(email);
    // Kiểm tra có ký tự đặc biệt
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(email);

    // Trả về true nếu tất cả các điều kiện đều đúng
    return hasUpperCase && hasLowerCase && hasSpecialChar;
  }
}
