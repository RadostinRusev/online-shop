import { Component} from '@angular/core';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{


 

  constructor(private service: ProductService) { }

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
