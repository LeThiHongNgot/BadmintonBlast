import { Component } from '@angular/core';
import { HeaherComponent } from "../../components/heaher/heaher.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CartService } from '../../../services/cart/cart.service';
import { ICart } from '../../../interfaces/i-Cart';
import { CustomersService } from '../../../services/customer/customers.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaherComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


}
