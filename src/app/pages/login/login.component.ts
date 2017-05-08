


import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { AppGlobal } from '../../app-global';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
  loginForm:Object={};
  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,) { 
      this.appGlobal["store"]= this.appGlobal["store"] || {};
    
  }

  ngOnInit() {
    console.log(location.pathname.split("/")[1])
    this.aRoute.params.subscribe(params => {
       
           this.myService.service("/stores/qrc/"+location.pathname.split("/")[1],"get").subscribe(
              data=> {
                
                   if(!!data){
                    this.appGlobal["store"]=data; 
            /*        this.loginForm["userName"]="admin";
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
    //this.router.navigate(['index',{}] );//{ id:mobile.id }
  }
   login(form: any): void{
     this.appGlobal.loading=true;
    // this.loginForm["merchantId"]=this.storeService.get("merchantId");
     //this.loginForm["zoneInfo"]=this.storeService.get("zoneInfo");
    // this.router.navigate(['index',{}] );//{ id:mobile.id }
     this.myService.service("/admin/login","post",this.loginForm).subscribe(
               data=> {
                   if(!!data){
                    this.appGlobal.toastTime=0.5;
                     this.appGlobal.userInfo=data;
                     console.log(this.appGlobal.userInfo)
                    
                     this.router.navigate(['index/store'] );//{ id:mobile.id }
                   }
                 }
                
            );


  }
}
