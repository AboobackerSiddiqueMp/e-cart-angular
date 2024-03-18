import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
 allWishListItems:any = []
  constructor(private api:AppService){}

  ngOnInit(): void {
    this,this.getAllItemsFromWishlist()
    
  }
  getAllItemsFromWishlist(){
    this.api.getWishlistItemApi().subscribe({
      next:(res:any)=>{
        console.log("==all wishlist items==");
        console.log(res)
        this.allWishListItems = res;
      },
      error:(res:any)=>{
        console.log(res)
      }
    })
  }
  removeItem(id:any){
    alert("hi")
  }

}
