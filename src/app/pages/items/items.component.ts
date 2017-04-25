

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
   isSelectItemOp:number=-1;
   itemOpGroup:Object={};
   itemOpGroups:any=[];
   itemOp:Object={};
   itemOps:any=[];

constructor(private myService:MyServiceService) { }
 ngOnInit() {
  	this.getCategories();
  	this.addOpGroupItem();
    }
 addOp(){

  	this.options.push({"name":"","price":"","order":"","picture":""});
  }
  addGroup(){
  	this.optionGroup={}
 	this.options=[];this.isSelectOpGroup=-1;
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
                        this.addGroup();
                        this.selectCat(data);
                   }
                 })
                
                        break;
              }
      }
  }
saveOpGroup(){
  
       this.category["customerOptions"]=this.category["customerOptions"] || [];
       this.optionGroup["options"]=this.optionGroup["options"] || [];
       this.optionGroup["options"]=this.optionGroup["options"].concat(this.options);
       if(!this.optionGroup["_id"]){
       		 this.category["customerOptions"]=this.category["customerOptions"].concat(this.optionGroup);
       }else{
       	   for(let i=0;i<this.category["customerOptions"].length;i++){
       	   	     if(this.optionGroup["_id"]==this.category["customerOptions"][i]["_id"]){
       	   	     	this.category["customerOptions"][i]=this.optionGroup;
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
   this.options=[];
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
  selectItem(item){
  	this.itemOpGroup=JSON.parse(JSON.stringify(item));
  }
  addOpGroupItem(){
  	alert("OK")
  	this.itemOpGroup={};
  	this.itemOps=[];
  	this.addOpItem();
  }
  addOpItem(){
  	
  	this.itemOps.push({"name":"","price":"","order":"","picture":""});
  }
  addItem(){
  	this.item={};	
  	this.itemOpGroup={};
  	this.itemOps=[];
    this.addOpItem();
    this.modalItem=true;
  }
  saveOpItem(){
  	
  	
 	  this.item["customerOptions"]=this.item["customerOptions"] || [];
       this.itemOpGroup["options"]=this.itemOpGroup["options"] || [];
       this.itemOpGroup["options"]=this.itemOpGroup["options"].concat(this.itemOps);
       if(!this.itemOpGroup["_id"]){
       		 this.item["customerOptions"]=this.item["customerOptions"].concat(this.itemOpGroup);
       }else{
       	   for(let i=0;i<this.item["customerOptions"].length;i++){
       	   	     if(this.itemOpGroup["_id"]==this.item["customerOptions"][i]["_id"]){
       	   	     	this.item["customerOptions"][i]=this.itemOpGroup;
       	   	     }
       	   }
       }

    
       this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
                 data=> {
                     if(!!data){
                     	this.item=data;
                       //this.isSelectItem=this.data["customerOptions"].length;
   //itemOpGroup:Object={};
   //itemOpGroups:any=[];
                     }
                   }
                  
              )
  }
  copy(item){
  	this.item=JSON.parse(JSON.stringify(item));
    this.modalItem=true;
  }
  saveItem(){
       this.item["category"]=this.category["_id"];
      if(!!this.item["_id"]){
          this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
                 data=> {
                     if(!!data){
                     			this.item=data;
                     			this.myService.service("/categories/"+this.category["_id"],"get").subscribe(
				                 data=> {
				                     if(!!data){
				                     		
					                       for(var i=0;i<this.categories.length;i++){
					                           if(this.categories[i]["_id"]==data["_id"]){
					                             this.categories[i]=data;
					                             this.category=data; 
					                             break;
					                           }  
				                        }
				                     }
				                   }
				                  
				              )
	                      
                     
                   }
                   
                  }
              )
        }else{
            this.myService.service("/items","post",this.item).subscribe(
                 data=> {
                     if(!!data){
                     	this.myService.service("/categories/"+this.category["_id"],"get").subscribe(
				                 data=> {
				                     if(!!data){
				                     		this.item=data;
					                       for(var i=0;i<this.categories.length;i++){
				                           if(this.categories[i]["_id"]==data["_id"]){
				                             this.categories[i]=data;
				                              this.category=data;
				                             break;
				                           }  
				                       }
				                     }
				                   }
				                  
				              )
                      //this.category["items"].push(data);
                       /*for(var i=0;i<this.categories.length;i++){
                           if(this.categories[i]["_id"]==this.category["_id"]){
                             this.categories[i]=this.category;
                              
                             break;
                           }  
                        }*/
                     /* this.isSelectCat=this.categories.length;
                      this.category=data;
                      this.categories.push(data);*/
                      

                     }
                     
                      
                   }
                  
              )
        }
  }
}
