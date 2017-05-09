

import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { AppGlobal } from '../../app-global';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
  
  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,) { 

      	if(!this.appGlobal["store"]["name"]){
  			this.aRoute.params.subscribe(params => {
       
           this.myService.service("/stores/qrc/"+location.pathname.split("/")[1],"get").subscribe(
              data=> {
                
                   if(!!data){
                    this.appGlobal["store"]=data; 

                   }else{
                    this.router.navigate(['']);
                   }
                 }
             )
   		})
  	}
    
  }

  ngOnInit() {
  	alert(2)
  //+this.appGlobal["store"]["merchantId"]
  
  	//this.router.navigate(['index',{}] );//{ id:mobile.id }
  }
 // test(e){
  	
  //	console.log(e.direction)
  //}
  //swipe(e) {
     //   console.log(e.direction);
       /* if (currentIndex > this.avatars.length || currentIndex < 0) return;

        let nextIndex = 0;
        
        // next
        if (action === this.SWIPE_ACTION.RIGHT) {
            const isLast = currentIndex === this.avatars.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;
        }

        // previous
        if (action === this.SWIPE_ACTION.LEFT) {
            const isFirst = currentIndex === 0;
            nextIndex = isFirst ? this.avatars.length - 1 : currentIndex - 1;
        }

        // toggle avatar visibility
        this.avatars.forEach((x, i) => x.visible = (i === nextIndex));*/
  //  }
}
