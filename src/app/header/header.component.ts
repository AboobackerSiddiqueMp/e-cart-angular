import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  wishlistlength:number = 0;
  cartLength:number = 0;
  constructor(private route:Router, private api:AppService){}
  loginUserName:any;
  ngOnInit(): void {
    if(sessionStorage.getItem("username")){
      this.loginUserName = sessionStorage.getItem("username")
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistlength = res;
      });
      this.api.cartCount.subscribe((res:any)=>{
        this.cartLength = res
      })
    }
    else{
      this.loginUserName =""
    }
  }
  logout(){
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token")
    this.loginUserName="";
    this.route.navigateByUrl('')
  }
}
