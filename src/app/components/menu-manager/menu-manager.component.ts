import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderManagerComponent } from '../header-manager/header-manager.component';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [
    NgIf,
    MatSidenavModule,
    HeaderManagerComponent,
    MatIconModule,
    NgStyle,
  ],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.css',
})
export class MenuManagerComponent {
  @Output() iconSelected = new EventEmitter<number>(); // Sự kiện phát ra chỉ số biểu tượng được chọn
  selectedIndex: number = 1; // Biến theo dõi biểu tượn

  selectIcon(index: number): void {
    this.selectedIndex = index; // Cập nhật chỉ số biểu tượng khi nhấp
  }

  getIconStyle(index: number) {
    // Kiểm tra nếu biểu tượng có chỉ số đang được chọn
    if (this.selectedIndex === index) {
      return {
        'background-color': ' #272848', // Màu nền khi chọn
        'border-color': ' #272848', // Màu viền khi chọn
        color: '#272848', // Màu trắng cho icon khi chọn
        'box-shadow': '0 0 15px  #272848', // Độ sáng cho khung khi chọn
      };
    } else {
      // Trạng thái mặc định khi không được chọn
      return {
        'background-color': '',
        'border-color': '',
        color: '', // Trả về màu mặc định
        'box-shadow': '',
      };
    }
  }
  getIcon(index: number) {
    // Kiểm tra nếu biểu tượng có chỉ số đang được chọn
    if (this.selectedIndex === index) {
      return {
        color: 'rgb(250, 248, 253)', // Màu trắng cho icon khi chọn
      };
    } else {
      // Trạng thái mặc định khi không được chọn
      return {
        color: '', // Trả về màu mặc định
      };
    }
  }
}
