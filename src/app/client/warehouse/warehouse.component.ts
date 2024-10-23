import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaherComponent } from '../../components/heaher/heaher.component';
import { CartService } from '../../../services/cart/cart.service';
import { ICart } from '../../../interfaces/i-Cart';
import { CustomersService } from '../../../services/customer/customers.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/i-Product';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../notification/notification.component';
@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [HeaherComponent, FooterComponent, CommonModule, NotificationComponent],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css',
})
export class WarehouseComponent {
  idcustomer: number;
  cartList: ICart[] = [];
  productOrderIds: { [key: number]: IProduct[] } = {};
  hidenotify: boolean = false;
  message: string ='';
  constructor(
    private CartService: CartService,
    private customerService: CustomersService,
    private ProductService: ProductService,
    private router: Router,
  ) {
    this.idcustomer = this.customerService.getClaimValue();
   this.getCart();
  }
  getCart()
  {
    this.CartService.getCartById(this.idcustomer).subscribe((data) => {
      this.cartList = data;
      this.cartList.forEach((order) => {
        this.getProductId(order.idproduct); // Lấy thông tin sản phẩm cho từng idproduct
      });
    });
  }
  getProductId(idproduct: number): void {
    this.ProductService.getProductById(idproduct).subscribe((data) => {
      if (!this.productOrderIds[data.idproduct]) {
        this.productOrderIds[data.idproduct] = [];
      }
      this.productOrderIds[data.idproduct].push(data);
    });
  }

  Closecarrt(idcart: number) {
    {
      this.CartService.deleteCart(idcart).subscribe((data) => {
        this.hidenotify = true;
        this.message = 'Đã xóa sản phẩm khỏi giỏ hàng';
        setTimeout(() => {
          this.hidenotify = false;
        }, 3000); 
        this.cartList = []; 
        this.productOrderIds = {}; 
      });
      this.getCart(); // Cập nhật lại danh sách cart
    }
  }
}
