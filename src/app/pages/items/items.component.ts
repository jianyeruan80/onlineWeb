

import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
@Component({
   selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
   appGlobal = AppGlobal.getInstance();
   category:Object={};
   categories:any=[];
   isSelectCat:number=-1;

  /* categorySub:Object={};
   categorySubs:any=[];*/
constructor(private myService:MyServiceService) { }
 ngOnInit() {
  	this.getCategories();
    }
/*  addSub(){
  	this.condimentSubs.push({"name":"","price":"","order":"","picture":""});
  }
  deleteSub(obj){
  	if(!isNaN(obj)){
  		this.condimentSubs.splice(obj,1);	
  	}else{
  		for(let i=0;i<this.condiment['options'].length;i++){
  			if(obj["_id"]==this.condiment['options'][i]["_id"]){
  				this.condiment['options'].splice(i,1)
  				break;
  			}
  		}
  	}
  	
  }*/

  saveCat(){
         if(this.category["_id"]){
  	  	  /*this.condiment['options']=this.condiment['options'] || [];
            this.condiment['options']=this.condiment['options'].concat(this.condimentSubs);
            for(var i=0;i<this.condiment['options'].length;i++){
            	 this.condiment['options'][i]["name"] =this.condiment['options'][i]["name"] || "Default"+i;
            	  this.condiment['options'][i]["price"] =this.condiment['options'][i]["price"] || 0;
          }*/
  	  	this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                   	 for(var i=0;i<this.categories.length;i++){
                    		 if(this.categories[i]["_id"]==data["_id"]){
                    		 	 this.categories[i]=data;
                    		 	
                    		 	 break;
                    		 }	
                    	}
     	             }
                 }
                
            );
  	  }else{
  	  		this.myService.service("/categories","post",this.category).subscribe(
               data=> {
                   if(!!data){
                    this.isSelectCat=this.categories.length;
                    this.category=data;
                   	this.categories.push(data);
                   	

                   }
                   
                  	
                 }
                
            );
  	  }
  	  
  }
  selectCat(item){
  	this.category=JSON.parse(JSON.stringify(item));
    
  }
  deleteCat(item){
  	this.myService.service("/categories/"+item["_id"],"delete").subscribe(
               data=> {
                    if(!!data){
                    	for(var i=0;i<this.categories.length;i++){
                    		 if(this.categories[i]["_id"]==item["_id"]){
                    		 	 this.categories.splice(i,1);
                    		 	 this.selectCat({})
                    		 	 this.isSelectCat=-1;
                    		 	 break;
                    		 }	
                    	}
                    	
                    }
                    }
                 )
  }
  getCategories(){
  		this.myService.service("/categories/merchantId","get").subscribe(
               data=> {
                   if(!!data){
                   	this.categories=data;
    }}
   );
  }
}
