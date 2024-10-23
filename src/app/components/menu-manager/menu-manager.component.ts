import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderManagerComponent } from '../header-manager/header-manager.component';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ManagerCustomerComponent } from '../../admin/managerCustomer/manager-customer.component';
import { TableComponent } from '../../table/table.component';
import { ManagerProductComponent } from "../../admin/manager-product/manager-product.component";
import { AddProductComponent } from "../../admin/add-product/add-product.component";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OrderComponent } from "../../admin/order/order.component";
@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [
    NgIf,
    MatSidenavModule,
    HeaderManagerComponent,
    MatIconModule,
    NgStyle,
    MatButtonModule,
    MatButtonModule,
    ManagerCustomerComponent,
    TableComponent,
    ManagerProductComponent,
    AddProductComponent,
    OrderComponent
],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.css',
})
export class MenuManagerComponent {
  manager: string = ''; // Biến theo dõi loại trang
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    // Lấy chỉ số từ URL và cập nhật biến manager
    this.route.params.subscribe(params => {
      this.manager = params['index'];
    });
  }

  selectIcon(index: string): void {
    this.router.navigate(['menu', index]); 
    this.manager=index;
  }

}
