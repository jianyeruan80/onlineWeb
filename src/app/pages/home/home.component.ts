import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { AppGlobal } from '../../app-global';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();

  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,) { 
      this.appGlobal["store"]= this.appGlobal["store"] || {};

    
  }

  ngOnInit() {
    //if(this.appGlobal["store"]=={})
    this.aRoute.params.subscribe(params => {
       
           this.myService.service("/stores/qrc/"+params.restaurant,"get").subscribe(
              data=> {
                 console.log(data)
                   if(!!data){
                    this.appGlobal["store"]=data; 
                    /*this.loginForm["userName"]="admin";
                    this.loginForm["password"]="admin";
                    this.appGlobal.toastTime=0;
                    this.storeService.set("merchantId", data.merchantId);
                    this.storeService.set("QRC", params.login);
                    this.storeService.set("ZONEINFO", data.zoneInfo);
                    
                    this.appGlobal.navSelect="store";
                    this.appGlobal.storeInfo=data;*/
                   //  this.router.navigate(['index/home',{}] );//{ id:mobile.id }
                   }else{
                    this.router.navigate(['']);
                   }
                 }
             )
    })
  	
  }
 
}
