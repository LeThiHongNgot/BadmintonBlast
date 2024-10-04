import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/i-Product';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ProductlistComponent } from '../productlist/productlist.component';
import { Ikindproduct } from '../../../interfaces/i-KindProduct';
import { KindproductService } from '../../../services/kindproduct/kindproduct.service';
import { HeaherComponent } from '../heaher/heaher.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, ProductlistComponent, NgClass, HeaherComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  kindproductMenu = [
    {
      id: 1,
      nameproduct: 'Vợt',
      image: '/assets/images/Racker.jpg'
    },
    {
      id: 2,
      nameproduct: 'Giày',
      image: '/assets/images/shoes.webp'
    },
    {
      id: 3,
      nameproduct: 'Balo',
      image: '/assets/images/backpack.webp'
    },
    {
      id: 4,
      nameproduct: 'Quần',
      image: '/assets/images/trouser.webp'
    },
    {
      id: 5,
      nameproduct: 'Áo',
      image: '/assets/images/Clothes.jpg'
    },
    {
      id: 6,
      nameproduct: 'Cầu',
      image: '/assets/images/ball.webp'
    },
  ];
  productsracker: IProduct[] = [];
  productshoes: IProduct[] = [];
  currentRacketIndex: number = 0; // Current index for racket products
  currentShoeIndex: number = 0; // Current index for shoe products
  itemsToShow: number = 12; // Number of products to show at a time
  kindproduct: Ikindproduct[] = [];
  constructor(
    private productService: ProductService,
    private kindproductService: KindproductService
  ) {}
  showOverlay: boolean = false;
  ngOnInit(): void {
    this.getKindProductService();
    this.getAllProducts(1); // Fetch racket products for category '1'
    this.getAllProducts(2); // Fetch shoe products for category '2'
  }

  getKindProductService() {
    this.kindproductService.getKindproducts().subscribe((data) => {
      this.kindproduct = data;
    });
  }
  // Fetch products and assign them to the respective arrays
  getAllProducts(kindproduct: number): void {
    this.productService
      .getProductsAsync('', kindproduct, 1, 10) // Fetch a larger number of products initially
      .subscribe((data) => {
        if (kindproduct === 2) {
          this.productshoes = data || [];
        } else {
          this.productsracker = data || [];
        }
      });
  }

  scrollSlider(direction: number): void {
    const slider = document.querySelector('.slider') as HTMLElement | null;
    if (slider) {
      const scrollAmount = direction * slider.offsetWidth;
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
