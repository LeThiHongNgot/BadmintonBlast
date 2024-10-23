import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DetailImageComponent } from '../../detail-image/detail-image.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IProductStock } from '../../../interfaces/i-ProductStock';
import { MatTableModule } from '@angular/material/table';
import { IBrand } from '../../../interfaces/i-Brand';
import { PagingComponent } from '../../components/paging/paging.component';
import { BrandService } from '../../../services/brand/brand.service';
import { KindproductService } from '../../../services/kindproduct/kindproduct.service';
import { Ikindproduct } from '../../../interfaces/i-KindProduct';
import { ImageService } from '../../../services/image/image.service';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/i-Product';
import { ProductstockService } from '../../../services/productstock/productstock.service';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DetailImageComponent,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    DetailImageComponent,
    NzSelectModule,
    MatTableModule,
    PagingComponent,
    NgxEditorModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  Math = Math;
  @Input() idProduct: number | null = null;
  Product: IProduct = {
    idproduct: 0,
    idbrand: 0,
    idkindproduct: 0,
    nameproduct: '',
    kindproduct: '',
    namebrand: '',
    description: '',
    price: 0,
    available: 0,
    deprice: 0,
    date: new Date(), 
    image: [],
    productstocks: [],
  };

  @Output() selectedImages: EventEmitter<File[]> = new EventEmitter<
    File[]
  >();
  Brands: IBrand[] = [];
  Kinds: Ikindproduct[] = [];
  allImages: boolean = false;
  @Output() statusAddProduct: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  selectedImagesList: File[] = [];
  sizes: string[] = []; // Mảng lưu danh sách kích thước
  productName: string = '';
  editor!: Editor;
  html = '';
  selectedCategory: string = '';
  pageSize: number = 6; // Số lượng sản phẩm trên mỗi trang
  currentPage: number = 1; // Trang hiện tại
  newSize: string = '';
  newColor: string = '';
  newQuantity: number = 0;
  displayedColumns: string[] = ['size', 'color', 'quantity', 'action'];
  checkStock: boolean = false;
  productStocks: IProductStock[] = [];
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  constructor(
    private BrandsService: BrandService,
    private kindsService: KindproductService,
    private imageService: ImageService,
    private productService: ProductService,
    private productstock: ProductstockService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.editor = new Editor();
    this.getAllBrand();
    this.getAllKind();
    if (this.idProduct) { 
      this.getIdProduct(this.idProduct);
    }
  }

  getIdProduct(idProduct: number) {
    this.productService.getProductById(idProduct).subscribe({
      next: (product) => {
        this.Product = product; // Gán sản phẩm đã lấy được vào thuộc tính
        // Khởi tạo selectedImagesList nếu chưa có
        if (!this.selectedImagesList) {
          this.selectedImagesList = [];
        }
        // Trích xuất hình ảnh từ sản phẩm
        this.Product.image.forEach((img) => {
          if (img.image4) {
            this.selectedImagesList.push(img.image4); // Đưa hình ảnh hợp lệ vào danh sách
          }
        });
        // Thêm vào productStocks
        this.Product.productstocks.forEach((stock) => {
          this.productStocks.push({
            id: stock.id,
            idproduct: stock.idproduct,
            namecolor: stock.namecolor,
            namesize: stock.namesize,
            quatity: stock.quatity,
          });
        });
        if (this.productStocks) {
          this.checkStock = true;
        }
      },
      error: (err) => {
        console.error('Error retrieving product:', err);
        // Xử lý lỗi, ví dụ như hiển thị thông báo
      },
    });
  }

  getAllBrand() {
    this.BrandsService.getAllBrands().subscribe((data) => {
      this.Brands = data;
    });
  }
  getAllKind() {
    this.kindsService.getKindproducts().subscribe((data) => {
      this.Kinds = data;
    });
  }
  addProductStock(): void {
    if (this.newSize && this.newColor && this.newQuantity) {
      this.checkStock = true;
      const newProduct: IProductStock = {
        id: 0, // Giả sử Id tự đ��ng tăng
        idproduct: this.productStocks.length + 1, // Giả sử Id tự động tăng
        namesize: this.newSize,
        namecolor: this.newColor,
        quatity: this.newQuantity,
      };
      this.productStocks.push(newProduct);
      this.newSize = '';
      this.newColor = '';
      this.newQuantity = 0;
    }
  }
  get paginatedProductStocks() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.productStocks.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  removeProductStock(product: IProductStock): void {
    const index = this.productStocks.indexOf(product);
    if (index >= 0) {
      this.productStocks.splice(index, 1);
    }
  }

  onAddCategory() {}
  onAddBrand() {}
  onImageSelect(event: any): void {
    const files: FileList = event.target.files; // Giả sử đây là FileList

    if (files) {
        this.selectedImagesList = []; // Khởi tạo lại danh sách ảnh
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; // Lấy file
            this.selectedImagesList.push(file); // Thêm file vào danh sách
        }
        this.selectedImages.emit(this.selectedImagesList); // Emit danh sách ảnh đã chọn
    }
}

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }
  
  removeImage(index: number): void {
    this.selectedImagesList.splice(index, 1);
  }

  allImage() {
    this.allImages = true;
  }
  closeAddproduct() {
    this.statusAddProduct.emit(false);
  }
  updateBrandName() {
    const selectedBrand = this.Brands.find(
      (brand) => brand.idbrand === this.Product.idbrand
    );
    this.Product.namebrand = selectedBrand ? selectedBrand.namebrand : '';
  }
  updateKindProductName() {
    const selectedKind = this.Kinds.find(
      (kind) => kind.idkindproduct === this.Product.idkindproduct
    );
    this.Product.kindproduct = selectedKind ? selectedKind.nameproduct : '';
  }
  onAddProduct() {
    if (this.validateProduct()) {
      const formData = new FormData();
      formData.append('Idproduct', this.Product.idproduct.toString());
      formData.append('Idbrand', this.Product.idbrand.toString());
      formData.append('Idkindproduct', this.Product.idkindproduct.toString());
      formData.append('Nameproduct', this.Product.nameproduct);
      formData.append('Kindproduct', this.Product.kindproduct);
      formData.append('Namebrand', this.Product.namebrand);
      formData.append('Description', this.Product.description);
      formData.append('Price', this.Product.price.toString());
      formData.append('Available', this.Product.available.toString());
      formData.append('Deprice', this.Product.deprice.toString());
      formData.append('Date', this.formatDate(this.Product.date));
  
      // Kiểm tra xem có hình ảnh không
      if (this.selectedImagesList && this.selectedImagesList.length > 0) {
        this.selectedImagesList.forEach((imageFile: File, index) => {
          console.log("Appending image: ", imageFile.name); // In tên tệp ra console
          formData.append('Image_' + index, imageFile, imageFile.name);
        });
      } else {
        console.warn("No images selected to upload.");
      }
  
      // Kiểm tra nội dung của FormData bằng cách lặp qua
      for (const [key, value] of formData as any) {
        console.log(key, value);
      }
  
      this.productService.addProduct(formData).subscribe(
        (data) => {
          this.resetForm();
          alert('Thêm sản phẩm thành công');
        },
        (error) => {
          console.error('Lỗi thêm hình ảnh:', error);
          alert('Lỗi thêm hình ảnh. Vui lòng kiểm tra lại.');
        }
      );
    } else {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
    }
  }
  
  
  validateProduct() {
    return (
      this.Product.nameproduct &&
      this.Product.price > 0 
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
  }
  resetForm() {
    this.Product = {
      idproduct: 0,
      idbrand: 0,
      idkindproduct: 0,
      nameproduct: '',
      kindproduct: '',
      namebrand: '',
      description: '',
      price: 0,
      available: 0,
      deprice: 0,
      date: new Date(), 
      image: [],
      productstocks: [],
    };

    this.selectedImagesList = [];
    this.productStocks = [];
  }
}
