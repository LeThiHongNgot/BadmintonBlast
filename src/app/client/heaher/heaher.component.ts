import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { BrandService } from '../../../services/brand/brand.service';
import { IBrand } from '../../../interfaces/i-Brand';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoriesComponent } from '../caterogies/caterogies.component';
import { ActivatedRoute } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-heaher',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    HomeComponent,
    FooterComponent,
    CategoriesComponent,
    CartComponent,
  ],
  templateUrl: './heaher.component.html',
  styleUrl: './heaher.component.css',
})
export class HeaherComponent {
  isProductVisible = false;
  Brands: IBrand[] = [];

  constructor(
    private route: ActivatedRoute,
    private brandservice: BrandService
  ) {}

  ngOnInit() {}

  onProductSelected(product: { id: number; name: string }) {
    console.log('Sản phẩm được chọn:', product);
  }
  toggleProductContainer() {
    this.isProductVisible = !this.isProductVisible;
  }

  // Thực hiện hiển thị khi chuột vào
  showProductContainer() {
    this.isProductVisible = true;
  }

  // Thực hiện ẩn khi chuột rời khỏi
  hideProductContainer() {
    this.isProductVisible = false;
  }

  getBrand() {
    this.brandservice.getAllBrands().subscribe((data) => {
      this.Brands = data;
    });
  }
}
