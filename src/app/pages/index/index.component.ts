import { Component, OnInit,EventEmitter,ViewChild,ElementRef,AfterViewChecked} from '@angular/core';
import { HomeComponent } from '../home/home.component';
import {Router}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { AppGlobal } from '../../app-global';
import { AboutComponent } from '../about/about.component';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
appGlobal = AppGlobal.getInstance();
@ViewChild('divHeight') divHeight: ElementRef;
broadcastDel: EventEmitter<boolean>;
testList:any=[];
 constructor(private myService:MyServiceService,private router:Router, private storeService: LocalStorageService) { 
       this.appGlobal["store"]= this.appGlobal["store"] || {};
      this.appGlobal["menus"]=this.appGlobal["menus"] || {};
      this.appGlobal['menus'][0]={};
      this.appGlobal['menus'][0]['items_docs']= [];
      this.broadcastDel = new EventEmitter<boolean>();

   }

  ngOnInit() {
   
  
    // if(!this.appGlobal.userInfo["accessToken"]){
     // this.router.navigate([this.storeService.get("QRC")]);
    // }
     
     //console.log(this.storeService.get("QRCURL"));
  	//this.router.navigate(["about",{}]);
  	//this.router.navigate(['/about', {outlets: {'about'}}]);
//  	 this.router.navigate(["about"],{relativeTo:this.aRoute});
   // this.router.navigate(['home',{}] );//{ id:mobile.id }
     //callfirst() {
  //  this.value = 1;
   // this.router.navigate(['/second', {outlets: {'secondchild': [this.value]}}]);
  //}
    //this.router.navigate(['/speakers', {outlets: {'bio': [id]}}]);
  }
  linkTo(item){
    console.log(item)
  	
  	  this.router.navigate([item.url]);
  	    //,{relativeTo:this.aRoute}
    //    var json={"xx":"xx"}
  	//this.router.navigate(['/index/about/2',json]);

  }
   ngAfterViewChecked(){
     alert(14)
        let div=this.divHeight.nativeElement.querySelectorAll('.test1');
        for(let i=0;i<div.length;i++){
            if(div[i].clientHeight>40){
                div[i].style.lineHeight=1.3;
            }
        }
        /*console.log(div[0].clientHeight);
        console.log(div[1].clientHeight);
    this.myService.service("/items/menus/admin","get").subscribe(
              data=> {
                
                   if(!!data){
                    this.appGlobal["menus"]=data; 
                    console.log(data)
                   }
                 }
             )

        */


   }


}
