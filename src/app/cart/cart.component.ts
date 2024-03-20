import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProduct: any = [];
  cartTotal: any = 0;
  constructor(private api: AppService) { }
  ngOnInit(): void {
    this.getAllCartItems()
  }
  getAllCartItems() {
    this.api.getCartApi().subscribe({
      next: (res: any) => {
        console.log("all cart items");
        console.log(res)
        this.allProduct = res;
        this.gettotalPrice()
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  removeItem(id: any) {
    this.api.removeFromcart(id).subscribe({
      next: (res: any) => {
        this.api.getCartCount()
        this.getAllCartItems()
        alert("Prodcut successfully removed")
      },
      error: (res: any) => {
        console.log(res)
      }
    })

  }
  gettotalPrice() {
    if (this.allProduct.length > 0) {
      this.cartTotal = Math.ceil(this.allProduct.map((item: any) => item.grandTotal).reduce((amt1: any, amt2: any) => amt1 + amt2))
      console.log(this.cartTotal);

    } else {
      this.cartTotal = 0
    }
  }

}
