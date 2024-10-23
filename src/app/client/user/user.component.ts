import { Component } from '@angular/core';
import { HeaherComponent } from '../../components/heaher/heaher.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgIf } from '@angular/common';
import { CustomersService } from '../../../services/customer/customers.service';
import { ICustomer } from '../../../interfaces/i-Customers';
import { CommonModule } from '@angular/common';
import { IOrder } from '../../../interfaces/i-Order';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../notification/notification.component';
import { BillService } from '../../../services/bill/bill.service';
import { IBill } from '../../../interfaces/i-Bill';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/i-Product';
import { OrderService } from '../../../services/order/order.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaherComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    NotificationComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  phoneNumber: string = '0912345678'; // Số điện thoại mẫu
  adcustomer: ICustomer = {
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
    status: true,
    role: 'customer',
  };

  profileImageUrl: string | ArrayBuffer | null = null; // Để lưu URL hình ảnh
  selectedFile: File | null = null; // Để lưu tệp hình ảnh đã chọn
  menu: string = 'thongtin';
  hidenotify: boolean = false;
  message: string = '';
  bills: IBill[] = []; // Mảng lưu thông tin các hóa đơn
  ordersByBillId: { [key: number]: IOrder[] } = {}; // Lưu đơn hàng theo idbill
  productOrderIds: { [key: number]: IProduct[] } = {};
  constructor(
    private customer: CustomersService,
    private billService: BillService,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.adcustomer.idcustomer = this.customer.getClaimValue();
    if (this.adcustomer.idcustomer) {
      this.customer
        .getCustomerId(this.adcustomer.idcustomer)
        .subscribe((customer) => {
          this.adcustomer = customer;
          this.profileImageUrl = this.adcustomer.imageCustomer;
          this.loadBills()
        });
    }
  }
  // Hàm xử lý sự kiện khi người dùng chọn ảnh
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = reader.result; // Cập nhật URL để hiển thị hình ảnh
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  loadBills(): void {
    // Gọi API để lấy thông tin các hóa đơn
    this.billService
      .GetBillIdCustomer(this.adcustomer.idcustomer) // Giả sử đây là phương thức đúng
      .subscribe((data) => {
        this.bills = data;
        console.log(this.bills);
        this.bills.forEach((bill) => {
          this.getOrder(bill.idbill); // Lấy đơn hàng cho từng hóa đơn
        });
      });
  }
  
  getOrder(idbill: number): void {
    this.orderService.getOrderId(idbill).subscribe((data) => { // Sửa lại phương thức nếu cần
      this.ordersByBillId[idbill] = data; // Lưu đơn hàng theo bill id
      this.ordersByBillId[idbill].forEach((order) => {
        this.getProductId(order.idproduct); // Lấy thông tin sản phẩm
      });
    });
  }
  
  getProductId(idproduct: number): void {
    this.productService.getProductById(idproduct).subscribe(data => {
      if (!this.productOrderIds[idproduct]) {
        this.productOrderIds[idproduct] = []; // Khởi tạo mảng nếu chưa có
      }
      this.productOrderIds[idproduct].push(data); // Thêm sản phẩm vào mảng
    });
  }
  
  

  // Hàm để ẩn các số giữa của số điện thoại
  maskPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length < 7) return phoneNumber; // Kiểm tra nếu số quá ngắn
    // Lấy 3 số đầu và 3 số cuối
    const start = phoneNumber.slice(0, 3);
    const end = phoneNumber.slice(-3);

    // Trả về định dạng số điện thoại với các số giữa được thay bằng dấu *
    return `${start}*****${end}`;
  }
  hidemenu(menu: string) {
    this.menu = menu;
  }
  logout() {
    this.customer.removeToken();
    window.location.href = '/';
  }

  uploadProfile(): void {
    if (!this.selectedFile) {
      console.error('Chưa chọn tệp hình ảnh!');
      return;
    }

    const formData = new FormData();

    // Chuyển đổi idcustomer thành chuỗi trước khi thêm vào FormData
    formData.append('idcustomer', String(this.adcustomer.idcustomer));
    formData.append('imageCustomer', this.selectedFile, this.selectedFile.name);
    formData.append('namecustomer', this.adcustomer.namecustomer || ''); // Bổ sung giá trị mặc định
    formData.append('phone', this.adcustomer.phone || '');
    formData.append('province', this.adcustomer.province || '');
    formData.append('district', this.adcustomer.district || '');
    formData.append('village', this.adcustomer.village || '');
    formData.append('hamlet', this.adcustomer.hamlet || '');
    formData.append('email', this.adcustomer.email || '');
    formData.append('passwordHash', this.adcustomer.passwordHash || '');
    formData.append('status', String(this.adcustomer.status)); // Đảm bảo status là chuỗi
    formData.append('role', this.adcustomer.role || '');
    this.customer
      .updateCustomer(this.adcustomer.idcustomer, formData)
      .subscribe({
        next: (response) => {
          this.message = 'Lưu thay đổi thành công!';
          this.hidenotify = true;
          setTimeout(() => {
            this.hidenotify = false; // ��n thông báo sau 2 giây
          }, 2000);
        },
        error: (err) => {
          this.message = 'lỗi lưu thay đổi!';
          this.hidenotify = true;
          setTimeout(() => {
            this.hidenotify = false; // ��n thông báo sau 2 giây
          }, 2000);
        },
      });
  }
}
