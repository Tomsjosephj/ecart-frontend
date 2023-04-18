import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allwishlist:any

  constructor(private api:ApiService){}
  ngOnInit(): void {
    
    this.api.getallwishlist()
    .subscribe((result:any)=>{
      console.log(result);

      this.allwishlist=result
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  //removeitem


  removeitem(id:any){

    this.api.removewishlist(id)
    .subscribe((result:any)=>{

      this.allwishlist=result

    },
    (result:any)=>{
      console.log(result.error);
      
    })

  }


  addtocart(products:any){

    //add quantity key to product as value as 1

    Object.assign(products,{quantity:1})

    //products['quantity']=1

    console.log(products);
    
    this.api.addtocart(products)
    .subscribe((result:any)=>{
      //200
      console.log(result);

      this.api.cartcount()

      //to remove itemfrom wishlist

      this.removeitem(products.id)


     alert(result)
     

     
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }




}
