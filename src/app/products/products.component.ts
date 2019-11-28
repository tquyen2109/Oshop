import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: any;
  category:string;
  subcription: Subscription;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService:ShoppingCartService
    ) {
    productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
        });
  

    
  
   }

  async ngOnInit(){
    this.subcription = (await this.shoppingCartService.getCart())
          .subscribe(cart => this.cart = cart);

  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }
}