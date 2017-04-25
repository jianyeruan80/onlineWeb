import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
@Component({
  selector: 'app-condiments',
  templateUrl: './condiments.component.html',
  styleUrls: ['./condiments.component.css']
})
export class CondimentsComponent implements OnInit {
   appGlobal = AppGlobal.getInstance();
   condiment:Object={};
   condiments:any=[];
   isSelect:number=-1;
   condimentSub:Object={};
   condimentSubs:any=[];
constructor(private myService:MyServiceService) { }
 ngOnInit() {
  	this.getCondiments();
  	this.addSub();
    }
  addSub(){
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
  	
  }

  save(){
  		this.condiment['options']=this.condiment['options'] || [];
            this.condiment['options']=this.condiment['options'].concat(this.condimentSubs);
            for(var i=0;i<this.condiment['options'].length;i++){
            	 this.condiment['options'][i]["name"] =this.condiment['options'][i]["name"] || "Default"+i;
            	  this.condiment['options'][i]["price"] =this.condiment['options'][i]["price"] || 0;
          }
         if(this.condiment["_id"]){
  	  	  
  	  	this.myService.service("/globalOptionGroups/"+this.condiment["_id"],"put",this.condiment).subscribe(
               data=> {
                   if(!!data){
                   	 for(var i=0;i<this.condiments.length;i++){
                    		 if(this.condiments[i]["_id"]==data["_id"]){
                    		 	 this.condiments[i]=data;
                    		 	 this.condimentSubs=[];
                    		 	 break;
                    		 }	
                    	}
                  }
                 }
                
            );
  	  }else{
  	  		this.myService.service("/globalOptionGroups","post",this.condiment).subscribe(
               data=> {
                   if(!!data){
                    this.isSelect=this.condiments.length;
                    this.condiment=data;
                   	this.condiments.push(data);
                   	this.condimentSubs=[];

                   }
                   
                  	
                 }
                
            );
  	  }
  	  
  }
  select(item){
  	this.condiment=JSON.parse(JSON.stringify(item));
    this.condimentSubs=[];
    if(!this.condiment["_id"]){
    	this.addSub();
    }
  }
  delete(item){
  	this.myService.service("/globalOptionGroups/"+item["_id"],"delete").subscribe(
               data=> {
                    if(!!data){
                    	for(var i=0;i<this.condiments.length;i++){
                    		 if(this.condiments[i]["_id"]==item["_id"]){
                    		 	 this.condiments.splice(i,1);
                    		 	 this.select({})
                    		 	 this.isSelect=-1;
                    		 	 break;
                    		 }	
                    	}
                    	
                    }
                    }
                 )
  }
  getCondiments(){
  		this.myService.service("/globalOptionGroups/merchantId","get").subscribe(
               data=> {
                   if(!!data){
                   	this.condiments=data;
    }}
   );
  }
}
