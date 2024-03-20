import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: any = [];
  constructor(private api: AppService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const id = res.id
      console.log("===id", id)
      this.getProduct(id)
    })
  }

  getProduct(id: any) {
    this.api.getProdutByIdApi(id).subscribe({
      next: (res: any) => {
        this.product = res
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  addItemTocart(product: any) {
    if (sessionStorage.getItem("token")) {
      Object.assign(product, { quantity: 1 })
      this.api.addToCartApi(product).subscribe({
        next: (res: any) => {
          this.api.getCartCount()
          alert("Product added successfully")
        },
        error: (res: any) => {
          console.log(res)
        }
      })
    }
    else {
      alert("Please login")
    }
  }
}
