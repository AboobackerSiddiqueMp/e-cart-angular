import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProduct: any = []
  constructor(private api: AppService) { }
  ngOnInit(): void {
    this.api.getAllPrdouctApi().subscribe({
      next: (res: any) => {
        this.allProduct = res
        console.log("===allProducts===");
        console.log(this.allProduct)
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  addToWishlist(product:any) {
    if (sessionStorage.getItem("token")) {
     this.api.addTowishlistApi(product).subscribe({
      next:(res:any)=>{
        alert("Product added successfully to wishlist")
      },
      error:(res:any)=>{
        console.log(res)
        alert(res.error)
      }
     })
    }
    else {
      alert("Please login")
    }

  }
  addToCart() {
    if (sessionStorage.getItem("token")) {
      alert("proceed")
    }
    else {
      alert("Please login")
    }
  }

}
