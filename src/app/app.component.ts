import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagerCustomerComponent } from './components/managerCustomer/manager-customer.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ManagerCustomerComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Badminton_Blast';
  httpClient = inject(HttpClient);

  fetchProduct(): void {}

  ngOnInit(): void {}
}
