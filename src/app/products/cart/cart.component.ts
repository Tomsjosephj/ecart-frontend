import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;

  makepaymentstatus:boolean=false

  iscollapse:boolean=true


  carttotalprice:number=0

  finalprice:number=0

  allitems:any

  offerbuttonstatus:boolean=true

  paymentbtn:boolean=false

  addressform=this.fb.group({
    username:[''],
    faltno:[''],
    street:[''],
    state:['']
  })

  user:any={}
  showSuccess: boolean=false;
  showCancel: boolean=false;
  showError: boolean=false;

  constructor(private api: ApiService, private fb: FormBuilder){}
  ngOnInit(): void {
    this.getcart()
    this.initConfig();
  }

  getcart(){
    this.api.getcart()
    .subscribe((result:any)=>{
      console.log(result);
      this.allitems=result

      //call cart price
      
      this.getcarttotalprice()
    },
    (result:any)=>{
      console.log(result.error);
      
    })

  }


  getcarttotalprice(){

    let total=0

    this.allitems.forEach((item:any)=>{
      total+=item.grandtotal

      this.carttotalprice=Math.ceil(total)

      this.finalprice=Math.ceil(total)
    })

  }


  removecartitem(id:any){
    this.api.removecartitem(id)
    .subscribe((result:any)=>{
      console.log(result);

      this.allitems=result


      //callcartprice
      this.getcarttotalprice()

      this.api.cartcount()
      
    })
  }


  incrementcartitem(id:any){
    this.api.incrementcartitem(id)
    .subscribe((result:any)=>{
      this.allitems=result

      this.getcarttotalprice()

      this.api.cartcount()
      
    },
    (result:any)=>{
      console.log(result.error);
      
    }
    )
  }

  decrementcartitem(id:any){
    this.api.decrementcartitem(id)
    .subscribe((result:any)=>{
      this.allitems=result

      this.getcarttotalprice()

      this.api.cartcount()
      
    },
    (result:any)=>{
      console.log(result.error);
      
    }
    )
  }


  emptycart(){
    this.api.emptycart()
    .subscribe((result:any)=>{
      this.allitems=[]

      this.getcarttotalprice()

      this.api.cartcount()

      
    })
  }

  viewoffers(){
    this.iscollapse=!this.iscollapse

  } 

  discount10(){
   let discount=this.carttotalprice*.1

   this.finalprice=this.carttotalprice-discount

   this.iscollapse=true

   this.offerbuttonstatus=false
  }

  discount50(){
    let discount=this.carttotalprice*.5
 
    this.finalprice=this.carttotalprice-discount
 
    this.iscollapse=true
    this.offerbuttonstatus=false
   }


   //submit form

   submit(){
    if(this.addressform.valid){

      this.paymentbtn=true

      this.user.username= this.addressform.value.username

      this.user.faltno= this.addressform.value.faltno

      this.user.street= this.addressform.value.street

      this.user.state= this.addressform.value.state



    }
    else{
      alert("Invalid form")
    }
   }


   makepayment(){

    this.makepaymentstatus=true
   }

   //paypal config

   private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
            alert('Payment succesfull')

            this.emptycart()
            this.makepaymentstatus=false
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;
            this.makepaymentstatus=false

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
            this.makepaymentstatus=false
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        }
    };
}



//modalclose

modalclose(){
  this.addressform.reset()
  this.paymentbtn=false
  this.makepaymentstatus=false
  this.showCancel=false
  this.showError=false
  this.showSuccess=false
  this.user=''
}


}
