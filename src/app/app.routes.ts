import { Routes } from '@angular/router';
import { ManagerCustomerComponent } from './components/managerCustomer/manager-customer.component';
import { LoginAdminComponent } from './components/loginAdmin/login-admin.component';
import { MenuManagerComponent } from './components/menu-manager/menu-manager.component';
import { HeaderManagerComponent } from './components/header-manager/header-manager.component';
import { PagingComponent } from './components/paging/paging.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DetailCustomerComponent } from './components/detail-customer/detail-customer.component';
import { HomeComponent } from './client/home/home.component';
import { HeaherComponent } from './client/heaher/heaher.component';
import { DetailproductComponent } from './client/detailproduct/detailproduct.component';
import { CategoriesComponent } from './client/caterogies/caterogies.component';
import { CourtComponent } from './client/court/court.component';
export const routes: Routes = [
  { path: '', redirectTo: 'managerCustomer', pathMatch: 'full' }, // Redirect to 'manager' instead of '/'
  { path: 'ManagerCustomer', component: ManagerCustomerComponent },
  { path: 'login', component: LoginAdminComponent },
  { path: '**', redirectTo: 'manager' }, // Handle unknown routes
  { path: '', component: MenuManagerComponent }, // Handle
  { path: 'headermanager', component: HeaderManagerComponent },
  { path: 'page', component: PagingComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'detailsCustomer', component: DetailCustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaherComponent },
  { path: 'footer', component: HeaherComponent },
  { path: 'chitietsanpham', component: DetailproductComponent },
  { path: 'chitietsanpham/:id/:name', component: DetailproductComponent },
  {path:'sanpham', component: CategoriesComponent },
  {path:'datsan', component:CourtComponent },
  // Các route khác...
];
