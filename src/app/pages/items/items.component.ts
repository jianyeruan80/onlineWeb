

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
   category:Object={};//category["customerOpstion"][0]["options"]
   categories:any=[];
   isSelectCat:number=-1;
   modal=false;
   modalItem=false;
   isSelectOpGroup=-1;
   categoryOp={};
   showOption:String="";
   
   isSelectOpItem=-1;
   item:Object={};
   items:any=[];
   itemOp={}; 

   

constructor(private myService:MyServiceService) { }
 ngOnInit() {
  	this.getCategories();
  	 this.init();
     this.initItemOp();
    }
    init(){
     this.categoryOp={};
     this.categoryOp['options']=[];
     this.categoryOp['options'].push({"key":new Date().getTime(),"name":"","price":"","order":"","picture":""});
     this.isSelectOpGroup=-1;
    }
   addOp(){
     this.categoryOp['options'].push({"key":new Date().getTime(),"name":"","price":"","order":"","picture":""});
   }
   deleteOp(i){
    this.categoryOp['options'].splice(i,1);
   }
   deleteOpGroup(i){
      this.category["customerOptions"].splice(i,1);
      this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                     for(var i=0;i<this.categories.length;i++){
                         if(this.categories[i]["_id"]==data["_id"]){
                           this.categories[i]=this.category;
                          break;
                         }  
                      }
                   }
                 }
                
            )
   }
   saveCatOp(){
     this.category["customerOptions"]=this.category["customerOptions"] || [];
     if(!this.categoryOp["_id"]){
       this.isSelectOpGroup=this.category["customerOptions"].length;
       this.category["customerOptions"].push(this.categoryOp); 
    }else{
      this.category["customerOptions"][this.isSelectOpGroup]=this.categoryOp;
     }
     this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                     for(var i=0;i<this.categories.length;i++){
                         if(this.categories[i]["_id"]==data["_id"]){
                           this.categories[i]=data;
                           this.categoryOp=data["customerOptions"][this.isSelectOpGroup];           
                            break;
                         }  
                      }
                   }
                 }
                
            )
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
                }})
  	  }
  	  
  }
  selectCatOp(item){
    this.categoryOp=JSON.parse(JSON.stringify(item));
  }
  selectCat(item){
    this.category=JSON.parse(JSON.stringify(item));
    this.init();
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
    }})
  }
  closeItem(){

      this.myService.service("/items/categories/"+this.category["_id"],"get").subscribe(
               data=> {
                   if(!!data){
                    this.category['itemsDoc']=data;
                     for(let i=0;i<this.categories.length;i++){
                           if(this.categories[i]["_id"]==this.category["_id"]){
                              this.categories[i]["itemsDoc"]=data;
                           }
                     }
                   }
    })
   // =
  }
  addItem(){
    this.item={};
    this.initItemOp();
    this.modalItem=true;
  }
  selectItemOp(item){
    this.itemOp=JSON.parse(JSON.stringify(item));
  }
  selectItem(item){
      this.item=JSON.parse(JSON.stringify(item));
      this.initItemOp();
      this.modalItem=true;
  }
  saveItem(){
      
      if(!!this.item["_id"]){
      
        this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
               data=> {
                   if(!!data){
                      this.item=data;
                      
                   }
                 }
                
            )
      }else{
          this.item["category"]=this.category["_id"];
          this.myService.service("/items","post",this.item).subscribe(
               data=> {
                   if(!!data){
                      this.item=data;
                     
                }})
      }
  }
  saveOpItem(){
    
     this.item["customerOptions"]=this.item["customerOptions"] || [];
     if(!this.itemOp["_id"]){
       this.isSelectOpItem=this.item["customerOptions"].length;
       this.item["customerOptions"].push(this.itemOp); 
    }else{
      this.item["customerOptions"][this.isSelectOpItem]=this.itemOp;
     }
     this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
               data=> {
                   if(!!data){
                        this.item=data;
                  }
             
                 })
  }
   initItemOp(){
     this.itemOp={};
     this.itemOp['options']=[];
     this.itemOp['options'].push({"key":new Date().getTime(),"name":"","price":"","order":"","picture":""});
     this.isSelectOpItem=-1;
    }
   addItemOp(){
     this.itemOp['options'].push({"key":new Date().getTime(),"name":"","price":"","order":"","picture":""});
   }
   deleteItemGroupOp(i){
     this.item["customerOptions"].splice(i,1);
     this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
               data=> {
                   if(!!data){
                        this.item=data;
                  }
             
                 })
   }
   deleteItemOp(i){
    this.itemOp['options'].splice(i,1);
   }
}
