import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  total?: number;
  quantity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartList: Product[] = [];
  public productList = new BehaviorSubject<Product[]>([]);

  constructor() {}


  // Adding Product to Product List

  addtoCart(product: Product) {
    const index = this.cartList.findIndex(
      (cart: any) => cart.id === product.id
    );
    if (index === -1) {
      this.cartList.push(product);
    } else {
      this.cartList[index].quantity = (this.cartList[index]?.quantity || 0) + 1;
      this.cartList[index].total = (this.cartList[index]?.quantity || 0)*this.cartList[index].price;
    }
    this.productList.next(this.cartList);
    this.getTotal();
  }


  // Getting the added product

  getProduct() {
    return this.productList.asObservable();
  }

  // getProductList() {
  //   return this.productList.getValue();
  // }

  // Total Amount

  getTotal(): number {
    let total = 0;
    this.cartList.map((res: Product) => {
      total += res.total || 0;
    });
    return total;
  }


  // Deleting single product from cart

  removeItem(product: any) {
    this.cartList.map((res: any, index: any) => {
      if (product.id === res.id) {
        if ( res?.quantity > 1) {
          res.quantity = res.quantity - 1;
          res.total = res.quantity*res.price;
        } else {
          this.cartList.splice(index, 1);
        }
      }
    });
    this.getTotal();
    this.productList.next(this.cartList);

  }


  // Delete all products from cart

  removeAll() {
    // this.cartList=[]
    this.productList.next([]);
  }
}
