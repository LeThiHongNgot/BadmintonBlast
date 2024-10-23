import { Routes } from '@angular/router';
import { CategoriesComponent } from './client/caterogies/caterogies.component';
import { CourtComponent } from './client/court/court.component';
import { DetailproductComponent } from './client/detailproduct/detailproduct.component';
import { HomeComponent } from './client/home/home.component';
import { UserComponent } from './client/user/user.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { DetailCustomerComponent } from './admin/detail-customer/detail-customer.component';
import { HeaderManagerComponent } from './components/header-manager/header-manager.component';
import { HeaherComponent } from './components/heaher/heaher.component';
import { LoginAdminComponent } from './client/loginAdmin/login-admin.component';
import { ManagerCustomerComponent } from './admin/managerCustomer/manager-customer.component';
import { PagingComponent } from './components/paging/paging.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotificationComponent } from './notification/notification.component';
import { MenuManagerComponent } from './components/menu-manager/menu-manager.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './client/cart/cart.component';
import { WarehouseComponent } from './client/warehouse/warehouse.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'managerCustomer', pathMatch: 'full' }, // Redirect to 'manager' instead of '/'
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Handle
  { path: 'ManagerCustomer', component: ManagerCustomerComponent },
  { path: 'login', component: LoginAdminComponent },
  { path: 'headermanager', component: HeaderManagerComponent },
  { path: 'page', component: PagingComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'detailsCustomer', component: DetailCustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaherComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'chitietsanpham', component: DetailproductComponent },
  { path: 'chitietsanpham/:id/:name', component: DetailproductComponent },
  { path: 'sanpham', component: CategoriesComponent },
  { path: 'datsan', component: CourtComponent },
  { path: 'khachhang', component: UserComponent },
  { path: 'menu/:index', component: MenuManagerComponent },
  { path: 'menu', component: MenuManagerComponent },
  // { path: 'giohang', component: CartComponent },
  { path: 'sanpham/:id/:name', component: CategoriesComponent },
  { path: 'sanpham/:keyword', component: CategoriesComponent },
  { path: 'giohang', component: WarehouseComponent },
  { path: '**', redirectTo: '' },
];
