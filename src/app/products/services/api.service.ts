import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold search term as behaviour subject

  searchterm = new BehaviorSubject('')

//to hold cart total count

  cartitemcount= new BehaviorSubject(0)

  cartitems=[]

 // base_url='http://localhost:3000'

  //deployed node server https://ecart-h679.onrender.com

  base_url= 'https://ecart-h679.onrender.com'

  constructor(private http: HttpClient) {

    this.cartcount()
   }

  //getallproducts

  getallproducts(){
    return this.http.get(`${this.base_url}/products/getallproducts`)
  }

  viewproduct(id:any){

    return this.http.get(`${this.base_url}/products/${id}`)

  }

  // add to wishlist

  addtowishlist(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }

    return this.http.post(`${this.base_url}/products/addtowishlist`,body)
  }


  //get all wishlist

  getallwishlist(){
  return  this.http.get(`${this.base_url}/wishlists/getallwishlist`)
  }

  //remove from wishlist

  removewishlist(id:any){

    return this.http.delete(`${this.base_url}/wishlists/removewishlist/${id}`)

  }


  addtocart(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity

    }
    return this.http.post(`${this.base_url}/products/addtocart`, body)
  }

  getcart(){
    return this.http.get(`${this.base_url}/cart/getcartitems`)
  }




  //to get cart count


  cartcount(){
    this.http.get(`${this.base_url}/cart/getcartitems`)
    .subscribe((result:any)=>{
      this.cartitemcount.next(result.length)
    })
  }



  //removecartitem

  removecartitem(id:any){

    return this.http.delete(`${this.base_url}/cart/item/${id}`)

  }

  //increment cart item

  incrementcartitem(id:any){
    return this.http.get(`${this.base_url}/cart/increment/${id}`)
  }

  decrementcartitem(id:any){
    return this.http.get(`${this.base_url}/cart/decrement/${id}`)

  }


  emptycart(){
  return  this.http.delete(`${this.base_url}/cart/emptycart`)
  }



}
