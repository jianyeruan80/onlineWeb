

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

   optionGroup:Object={};
   optionGroups:any=[];
   isSelectOpGroup=-1;
   modal=false;
   showOption:String="";
   option:Object={};
   options:any=[];

   modalItem=false;
   itemShowOption:String="";
   items:any=[];
   item:Object={};
   isSelectItem:number=-1;
   itemOpGroup:Object={};
   itemOpGroups:any=[];
   itemOp:Object={};
   itemOps:any=[];

constructor(private myService:MyServiceService) { }
 ngOnInit() {
  	this.getCategories();
    }
 addOp(){
  	this.options.push({"name":"","price":"","order":"","picture":""});
  }
  deleteOp(obj){

  	if(!isNaN(obj)){
  		this.options.splice(obj,1);	
  	}else{

  		for(let i=0;i<this.optionGroup['options'].length;i++){
  			if(obj["_id"]==this.optionGroup['options'][i]["_id"]){
  				this.optionGroup['options'].splice(i,1)
         
  				break;
  			}
  		}
  	}
  	
  }
  deleteOpGroup(item){
   for(let i=0;i<this.category["customerOptions"].length;i++){
                      if(item["_id"]==this.category["customerOptions"][i]["_id"]){
                        this.category["customerOptions"].splice(i,1);
             this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                        this.isSelectOpGroup=-1;
                        this.optionGroup={};
                        this.selectCat(data);
                   }
                 })
                
                        break;
              }
      }
  }
saveOpGroup(){
  
       this.category["customerOptions"]=this.category["customerOptions"] || [];
        if(!this.optionGroup["_id"]){
            this.category["customerOptions"].push(this.optionGroup);  
          }else{
          
               for(let i=0;i<this.category["customerOptions"].length;i++){
                      if(this.optionGroup["_id"]==this.category["customerOptions"][i]["_id"]){
                        this.category["customerOptions"][i]=this.optionGroup;
                                this.category["customerOptions"][i]['options']=this.category["customerOptions"][i]['options'] || [];
                                this.category["customerOptions"][i]['options']=this.category["customerOptions"][i]['options'].concat(this.options);
                                for(var j=0;j<this.category["customerOptions"][i]['options'].length;j++){
                                   this.category["customerOptions"][i]['options'][j]["name"] =this.category["customerOptions"][i]['options'][j]["name"] || "Default"+j;
                                    this.category["customerOptions"][i]['options'][j]["price"] =this.category["customerOptions"][i]['options'][j]["price"] || 0;
                              }
                        break;
                      }
               }
          }

            this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                     for(var i=0;i<this.categories.length;i++){
                         if(this.categories[i]["_id"]==data["_id"]){
                           this.categories[i]=data;
                           this.selectCat(data);
                           if(!this.optionGroup["_id"]){
                              this.isSelectOpGroup=data["customerOptions"].length-1;
                              this.optionGroup=this.categories[i]["customerOptions"][this.isSelectOpGroup];
                              
                            }
                             this.optionGroups=[];
                              this.options=[];
                           break;
                         }  
                      }
                   }
                 })
                
            
}
  saveCat(){
       if(!!this.category["_id"]){
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
                
            )
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
    this.showOption="";
  	this.category=JSON.parse(JSON.stringify(item));
     if(!!this.category["customerOptions"]){
        for(var i=0;i<this.category["customerOptions"].length;i++){
        this.showOption+=this.category["customerOptions"][i]["group"]+","
      }
    }
   
    
  }
   selectOpGroup(item){

    this.optionGroup=JSON.parse(JSON.stringify(item));
  
   
     
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
   )
  }
  addItem(){
    alert("OK");
    this.modalItem=true;
  }
  saveItem(){
       this.item["category"]=this.category["_id"];
      if(!!this.item["_id"]){
          this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
                 data=> {
                     if(!!data){

                       /*for(var i=0;i<this.categories.length;i++){
                           if(this.categories[i]["_id"]==data["_id"]){
                             this.categories[i]=data;
                              
                             break;
                           }  
                        }*/
                     }
                   }
                  
              )
        }else{
            this.myService.service("/items","post",this.item).subscribe(
                 data=> {
                     if(!!data){
                      this.item=data;
                     /* this.isSelectCat=this.categories.length;
                      this.category=data;
                      this.categories.push(data);*/
                      

                     }
                     
                      
                   }
                  
              )
        }
  }
}
