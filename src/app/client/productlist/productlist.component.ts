import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { NgFor,NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { IProduct } from '../../../interfaces/i-Product';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule,MatIconModule,NgFor,NgIf],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  @Input() productList: IProduct[] = [];
  @Input() shouldWrap:boolean=false;  
  rating = 2.3; // Điểm đánh giá của bạn
  fullStars: number[] = [];
  hasHalfStar: boolean = false;
  emptyStars: number[] = [];

  ngOnInit() {
    console.log(this.shouldWrap)
    const fullStarsCount = Math.floor(this.rating); // Số sao đầy
    const hasHalfStar = this.rating % 1 !== 0; // Xác định nếu có nửa sao
    const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0); // Số sao trống

    // Tạo mảng sao
    this.fullStars = Array(fullStarsCount).fill(0); // Số lượng sao đầy
    this.hasHalfStar = hasHalfStar; // Nửa sao nếu cần
    this.emptyStars = Array(emptyStarsCount).fill(0); // Số lượng sao trống
  }
  constructor(private router: Router) {}

  detailproduct(id: number, name: string) {
    if (id === undefined || id === null) {
      console.error('ID sản phẩm không hợp lệ:', id);
      return; // Thoát khỏi hàm nếu ID không hợp lệ
    }
  
    if (!name) {
      console.error('Tên sản phẩm không hợp lệ:', name);
      return; // Thoát khỏi hàm nếu tên không hợp lệ
    }
  
    const formattedName = this.removeDiacritics(name);
    
    console.log('Navigating to: /chitietsanpham', id, encodeURIComponent(formattedName)); // Thông báo
    this.router.navigate(['/chitietsanpham', id, encodeURIComponent(formattedName)]);
  }
  
  
  // Hàm loại bỏ dấu
  removeDiacritics(str: string): string {
    if (!str) return ''; // Trả về chuỗi rỗng nếu str là undefined hoặc null
  
    const diacriticsMap: { [key: string]: string } = {
      'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
      'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
      'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
      'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
      'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
      'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
      'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
      'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
      'đ': 'd',
      // Thêm các ký tự khác nếu cần
    };
  
    return str.replace(/[áàảãạắằẳẵặấầẩẫậíìỉĩịóòỏõọốồổỗộúùủũụýỳỷỹỵđ]/g, function (match) {
      return diacriticsMap[match] || match;
    }).replace(/\s+/g, '-').toLowerCase(); // Thay khoảng trắng bằng dấu gạch ngang
  }
  
}
