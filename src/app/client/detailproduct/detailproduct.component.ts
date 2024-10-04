import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/i-Product';
import { NgFor, NgIf } from '@angular/common';
import { ProductlistComponent } from '../productlist/productlist.component';
import { PagingComponent } from '../../components/paging/paging.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaherComponent } from '../heaher/heaher.component';
@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    ProductlistComponent,
    PagingComponent,
    FooterComponent,
    HeaherComponent,
  ],
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css',
})
export class DetailproductComponent {
  Math = Math;
  product: IProduct | null = null;
  productKind: number = 0;
  productsKind: IProduct[] = [];
  selectedProductStock: any = null;
  selectedImage: any = null; // Hoặc có thể khởi tạo thành null
  shouldWrap: boolean = true;
  showFullDescription: boolean = false; // Trạng thái hiển thị mô tả
  productId: number = 1;
  productName: string = '';
  shouldSwap:boolean=true;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // + để chuyển đổi thành số
      this.productName = decodeURIComponent(params['name']); // Giải mã tên sản phẩm
    });
    if(this.productId)
    {
      this.productService.getProductById(this.productId).subscribe((data) => {
        this.product = data;
        this.selectedImage =
          this.product.image.length > 0 ? this.product.image[0].image4 : null;
      });
    }
  }
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
   
    this.getProducts(1, 8, 1); // Lấy danh sách sản phẩm của tất cả loại (kindproduct = 3)
  }

  total: number = 0;
  pageSize: number = 8; // Default page size
  pageIndex: number = 1; // Initial page index
  kindproduct: number = 0;

  // Hàm lấy danh sách sản phẩm
  getProducts(kindproduct: number, pageSize: number, pageIndex: number) {
    this.productService
      .getProductsAsync('', kindproduct, pageIndex, pageSize)
      .subscribe((data) => {
        this.productsKind = data;
      });

    // Lấy tổng số sản phẩm
    this.productService.getTotalProduct('', kindproduct).subscribe((data) => {
      this.total = data; // Cập nhật tổng số sản phẩm
    });
  }

  // Hàm thay đổi trang
  onPageChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.getProducts(this.kindproduct, this.pageSize, this.pageIndex);
  }
  selectImage(image: any) {
    this.selectedImage = image;
  }

  isImage(image: any) {
    return this.selectedImage === image; // Sửa tên biến thành selectedImage
  }

  formatDescription(description: string): string {
    if (description.length > 200 && !this.showFullDescription) {
      return description.substring(0, 400) + '...'; // Cắt mô tả nếu nó quá dài
    }
    return description; // Hiển thị toàn bộ mô tả
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription; // Đảo ngược trạng thái hiển thị
  }

  // Hàm để kiểm tra xem productStock hiện tại có được chọn hay không
  isSelected(productStock: any) {
    return this.selectedProductStock === productStock;
  }

  // Hàm để chọn productStock khi nhấp vào nút
  selectProductStock(productStock: any) {
    this.selectedProductStock = productStock;
  }

  addToCart(product: IProduct): void {
    console.log('Adding to cart:', product);
    // Add logic to handle adding to cart
  }

  addToWishlist(product: IProduct): void {
    console.log('Adding to wishlist:', product);
    // Add logic to handle adding to wishlist
  }

  goBack(): void {
    // Logic to go back to the previous page
    console.log('Go back');
  }
}
