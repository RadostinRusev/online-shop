import { Injectable } from '@angular/core';
import { IProduct } from './Shared/interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

   products: IProduct[] | undefined;

  constructor() { 
  }

  addProduct(product: IProduct){
    if(this.products === undefined){
      this.products = new Array;
    }
    this.products!.push(product);
    console.log("product added")
  }

  getAllProducts(){
    return this.products;
  }
}
