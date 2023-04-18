import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
itemcount:number=0
  constructor(private api: ApiService){}
  ngOnInit(): void {
    this.api.cartitemcount
    .subscribe((count:any)=>{

      this.itemcount=count
    })
  }

  search(event:any){
    //assign value to behaviour subject
    this.api.searchterm.next(event.target.value)
    
  }

}
