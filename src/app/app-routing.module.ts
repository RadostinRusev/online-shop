import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CartComponent } from "./cart/cart.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
          path: 'home',
          component: HomeComponent
      },
      {
          path: 'products',
          component: ProductsComponent
      },
      {
          path: 'about',
          component: AboutComponent
      },
      {
          path: 'contacts',
          component: ContactsComponent
      },
      {
          path: 'cart',
          component: CartComponent
      }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }