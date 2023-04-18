import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allproducts:any

  searchkey:any
  constructor(private api:ApiService){}
  ngOnInit(): void {

    this.api.getallproducts()
    .subscribe((result:any)=>{
      console.log(result);
      this.allproducts=result
    },

    (result:any)=>{
      console.log(result.error);
      
    }
    
    
    )



    //get behavior subject

    this.api.searchterm
    .subscribe((result:any)=>{
      console.log(result);
      this.searchkey=result
    })
    
  }

  //addtocart

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


     alert(result)
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  

}
