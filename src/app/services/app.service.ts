import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  server_url = "http://localhost:3000"

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem('token')){
      this.getWishlistCount();
    }
   }

  addTokenHeader() {
    // create an object of HttpHeaders class
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }
  wishlistCount = new BehaviorSubject(0)

  getWishlistCount(){
    this.getWishlistItemApi().subscribe((res:any)=>{
     this.wishlistCount.next(res.length);
    })
  }

  getAllPrdouctApi() {
    return this.http.get(`${this.server_url}/all-products`)
  }

  registerApi(user: any) {
    return this.http.post(`${this.server_url}/register`, user)
  }

  loginApi(user: any) {
    return this.http.post(`${this.server_url}/login`, user)
  }
  getProdutByIdApi(id: any) {
    return this.http.get(`${this.server_url}/get-product/${id}`)
  }
  addTowishlistApi(product: any) {
    return this.http.post(`${this.server_url}/add-wishlist`, product, this.addTokenHeader())
  }
  getWishlistItemApi() {
    return this.http.get(`${this.server_url}/wishlist/allproduct`, this.addTokenHeader())
  }
  removeItemFromWishlist(id: any) {
    return this.http.delete(`${this.server_url}/wishlist/remove/${id}`,this.addTokenHeader())
  }
  addToCartApi(product:any){
    return this.http.post(`${this.server_url}/add-cart`,product,this.addTokenHeader())
  }
}
