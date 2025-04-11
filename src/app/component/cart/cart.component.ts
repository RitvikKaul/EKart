import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product: any = [];
  public total!:  number;


  constructor(private cartservice: CartService) { }

  ngOnInit(): void {

    this.cartservice.getProduct().subscribe((res)=>{
      this.product = res;
      this.total = this.cartservice.getTotal();
    })

  }

  removeItem(item:any){
    this.cartservice.removeItem(item);
    this.total = this.cartservice.getTotal();
  }
  emptycart(){
    this.cartservice.removeAll();
  }


  
}
