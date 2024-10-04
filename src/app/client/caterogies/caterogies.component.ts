import { Component } from '@angular/core';
import { IProduct } from '../../../interfaces/i-Product';
import { ProductService } from '../../../services/product/product.service';
import { ProductlistComponent } from '../productlist/productlist.component';
import { PagingComponent } from '../../components/paging/paging.component';
import { HeaherComponent } from "../heaher/heaher.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ProductlistComponent, PagingComponent, HeaherComponent, FooterComponent],
  templateUrl: './caterogies.component.html',
  styleUrls: ['./caterogies.component.css'],
})
export class CategoriesComponent {
  Math = Math;
  products: IProduct[] = [];
  total: number = 0;
  pageSize: number = 12; // Default page size
  pageIndex: number = 1; // Initial page index
  shouldWrap: boolean = true;
  kindproduct: number = 3;

  constructor(private productService: ProductService) {
    this.getProducts(this.kindproduct, this.pageSize, this.pageIndex);
  }

  // Hàm lấy danh sách sản phẩm
  getProducts(kindproduct: number, pageSize: number, pageIndex: number) {
    this.productService
      .getProductsAsync('', kindproduct, pageIndex, pageSize)
      .subscribe((data) => {
        this.products = data;
        console.log('Product Data:', data);
      });

    // Lấy tổng số sản phẩm
    this.productService.getTotalProduct('', kindproduct).subscribe((data) => {
      console.log('Total Products:', data);
      this.total = data; // Cập nhật tổng số sản phẩm
    });
  }

  // Hàm thay đổi trang
  onPageChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.getProducts(this.kindproduct, this.pageSize, this.pageIndex);
  }
}
