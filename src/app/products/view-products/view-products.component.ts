import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  productid:string=''

  viewproducts:any

  constructor(private router:ActivatedRoute, private api:ApiService){}
  ngOnInit(): void {

    this.router.params
    .subscribe((result:any)=>{
      console.log(result);

      this.productid=result.id

    } )

    this.api.viewproduct(this.productid)
    .subscribe((data:any)=>{
      //200
      console.log(data);

      this.viewproducts=data


      
    },
    //400

    (result:any)=>{

      console.log(result.error);
      

    }
    
    )


   }

   addtowishlist(products:any){

    this.api.addtowishlist(products)
    .subscribe((result:any)=>{
      

      alert(result)
      
    },
    (result:any)=>{
      alert(result.error)
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


     alert(result)
      
    },
    (result:any)=>{
      alert(result.error)
    })
  }

}
