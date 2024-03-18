import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  server_url = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  addTokenHeader() {
    // create an object of HttpHeaders class
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
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
  addTowishlistApi(product:any){
    return this.http.post(`${this.server_url}/add-wishlist`,product,this.addTokenHeader())
  }
 getWishlistItemApi(){
  return this.http.get(`${this.server_url}/wishlist/allproduct`,this.addTokenHeader())
 }
}
