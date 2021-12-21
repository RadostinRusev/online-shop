import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private service: ProductService) {}

  ngOnInit(): void {}

  moveProductInCart(
    img: HTMLImageElement,
    productName: HTMLElement,
    productPrice: HTMLElement
  ) {
    this.service.addProduct({
      imgSrc: img.src,
      name: productName.textContent,
      price: productPrice.textContent,
    });
  }
}
