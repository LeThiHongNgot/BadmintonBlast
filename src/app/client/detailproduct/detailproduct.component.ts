import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/i-Product';
import { ProductlistComponent } from '../productlist/productlist.component';
import { PagingComponent } from '../../components/paging/paging.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaherComponent } from '../../components/heaher/heaher.component';
import { SharedService } from '../../../services/Share.service';
import { PreviewService } from '../../../services/preview/preview.service';
import { IPreview } from '../../../interfaces/i-Preview';
import { CartService } from '../../../services/cart/cart.service';
import { ICart } from '../../../interfaces/i-Cart';
import { MatIconModule } from '@angular/material/icon';
import { CustomersService } from '../../../services/customer/customers.service';
import { NotificationComponent } from '../../notification/notification.component';
@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [
    CommonModule,
    ProductlistComponent,
    PagingComponent,
    FooterComponent,
    HeaherComponent,
    MatIconModule,
    NotificationComponent,
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
  productId: number = 0;
  productName: string = '';
  shouldSwap: boolean = true;
  totalpreview: number = 0;
  previews: IPreview[] = [];
  rating: number = 0; // Total rating value loaded from the backend
  fullStars: number[] = [];
  hasHalfStar: boolean = false;
  emptyStars: number[] = [];
  totalReviews: number = 0; // Total number of reviews or ratings
  maxRating: number = 5;
  idcustomer: number = 0;
  hidenotify: boolean = false;
  message: string = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private preview: PreviewService,
    private cartService: CartService,
    private sharedService: SharedService,
    private customerService: CustomersService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // + để chuyển đổi thành số
      this.productName = decodeURIComponent(params['name']); // Giải mã tên sản phẩm
    });
    if (this.productId) {
      // Get the product details by ID
      this.productService.getProductById(this.productId).subscribe((data) => {
        this.product = data;
        this.selectedImage =
          this.product.image.length > 0 ? this.product.image[0].image4 : null;

        this.preview
          .getPreview(this.productId)
          .subscribe((data: IPreview[]) => {
            this.previews = data;
            this.totalpreview = data.length;
            if (this.totalpreview > 0) {
              // Calculate the total rating, ensuring Preview1 is defined
              this.rating =
                data.reduce((acc, preview) => {
                  return acc + (preview.preview1 || 0); // Safely add preview value
                }, 0) / this.totalpreview; // Calculate average

              console.log('Average Rating:', this.rating);
            } else {
              this.rating = 0; // Default rating if no previews
            }
          });
        this.star();
      });
    }
  }

  addCart() {
    this.idcustomer = this.customerService.getClaimValue();
    console.log(this.idcustomer)
    if (this.idcustomer !== 0) {
      const datacart = {
        idproduct: this.productId,
        idcustomer: this.idcustomer,
        quatity: 1,
        color: '',
        size: '',
      };
      this.cartService.addCart(datacart).subscribe({
        next: (value) => {
          this.message = 'Thêm vào giỏ hàng thành công';
          this.hidenotify = true;
          setTimeout(() => {
            this.hidenotify = false; // ��n thông báo sau 2 giây
          }, 2000);
        },
        error: (error) => {
          this.message = 'Sản phẩm đã được thêm vào giỏ hàng';
          this.hidenotify = true;
          setTimeout(() => {
            this.hidenotify = false; // ��n thông báo sau 2 giây
          }, 2000);
        },
      });
    }else
    {
      this.message = 'Vui lòng đăng nhập';
          this.hidenotify = true;
          setTimeout(() => {
            this.hidenotify = false; // ��n thông báo sau 2 giây
          }, 2000);
    }
  }
  total: number = 0;
  pageSize: number = 8; // Default page size
  pageIndex: number = 1; // Initial page index
  kindproduct: number = 0;

  getProducts(kindproduct: number, pageSize: number, pageIndex: number) {
    this.productService
      .getProductsAsync('', kindproduct, pageIndex, pageSize, 0, 0, 0, 0)
      .subscribe((data) => {
        this.productsKind = data;
      });

    // Lấy tổng số sản phẩm
    this.productService
      .getTotalProduct('', kindproduct, 0, 0, 0, 0)
      .subscribe((data) => {
        this.total = data; // Cập nhật tổng số sản phẩm
      });
  }
  changediscount(price: number, discountPercent: number): number {
    return price * (1 - discountPercent / 100);
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  isImage(image: any) {
    return this.selectedImage === image; // Sửa tên biến thành selectedImage
  }

  star() {
    const fullStarsCount = Math.floor(this.rating); // Số sao đầy
    const hasHalfStar = this.rating % 1 !== 0; // Xác định nếu có nửa sao
    const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0); // Số sao trống

    // Tạo mảng sao
    this.fullStars = Array(fullStarsCount).fill(0); // Số lượng sao đầy
    this.hasHalfStar = hasHalfStar; // Nửa sao nếu cần
    this.emptyStars = Array(emptyStarsCount).fill(0); // Số lượng sao trống
  }
  addToCart(product: IProduct): void {
    console.log('Adding to cart:', product);
    // Add logic to handle adding to cart
  }

  addToWishlist(product: IProduct): void {
    console.log('Adding to wishlist:', product);
    // Add logic to handle adding to wishlist
  }
}
