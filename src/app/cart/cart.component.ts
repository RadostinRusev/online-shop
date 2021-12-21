import {  Component,  OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpService } from "../Shared/http.service";
import { IProduct } from '../Shared/interfaces/product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit {

  products: IProduct[] | undefined;

  constructor(public http: HttpService, private router: Router,private service: ProductService) { this.getAllProducts() }
  ngOnInit() {
    console.log(this.http.test);
  }
  ngAfterViewInit(): void {
    this.ready()
  }

   ready() {
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', this.quantityChanged)
    }
  }
  onSave(){
    alert('hi')
  }
  updateCartTotala() {
    var cartRows = document.getElementsByClassName('product-section')
    var total = 0
    var productsNameAndValue
    for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElementName = cartRow.getElementsByClassName('product-element')[0].innerHTML
        var priceElement = cartRow.getElementsByClassName('product-element-number')[0].innerHTML
        var quantityEl = (<HTMLInputElement>cartRow.getElementsByClassName('cart-quantity-input')[0]).value;
        var quantityEl2 = (<HTMLInputElement>cartRow.getElementsByClassName('cart-quantity-input')[1]).value;
        var quantity = parseFloat(quantityEl)
        var quantity2 = parseFloat(quantityEl2)
        var overallQantity= quantity + quantity2
        var price = parseFloat(priceElement)
        
        total = total + (price * overallQantity)
       
    }
    total = Math.round(total * 100) / 100
  
    document.getElementsByClassName('total')[0].innerHTML=total.toString()
  }
quantityChanged(event: { target: any; }) {
  var input = event.target
  if (isNaN(input.value) || input.value < 0) {
      input.value = 1
  }
  var cartRows = document.getElementsByClassName('product-elements')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
  var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('product-element-number')[0].innerHTML
      var quantityEl = (<HTMLInputElement>cartRow.getElementsByClassName('cart-quantity-input')[0]).value;
      var quantityEl2 = (<HTMLInputElement>cartRow.getElementsByClassName('cart-quantity-input')[1]).value;
      var quantity = parseFloat(quantityEl)
      var quantity2 = parseFloat(quantityEl2)
      var overallQantity= quantity + quantity2
      var price = parseFloat(priceElement)
      
  //    var quantity = quantityElement.value
      total = total + (price * overallQantity)
     
  }
  total = Math.round(total * 100) / 100

  document.getElementsByClassName('total')[0].innerHTML='Цена:'+total.toString()
}
sendForm(form:NgForm){
  console.log('asd');
  if(form.invalid){
    return;
  }
  let cena= document.getElementsByClassName('total')[0].innerHTML
  const {name,surname,lastname,Address,PhoneNumber, email, Message} = form.value;
  let user ={
      name:name,
      surname:surname,
      lastname:lastname,
      email:email,
      messagea:Message,
      address:Address,
      phoneNumber:PhoneNumber,
      cost:cena
    }
    
  const confirmation = confirm("Потвърждавате ли вашата поръчка?")
    if(confirmation == true){
      this.http.sendForm("http://localhost:3000/sendform", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${user.phoneNumber}`
        );
      },err => {
        console.log(err);       
      });
      form.reset();
     // this.router.navigate(['/']);
    }
    
}

getAllProducts(){
 this.products = this.service.getAllProducts();
 console.log(this.products);
}



}