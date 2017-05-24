

import { Component, OnInit,EventEmitter,Output ,ElementRef,ViewChild} from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
@Component({
   selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
   //@Output() deleteBnt:EventEmitter<boolean>;
   
   appGlobal = AppGlobal.getInstance();
   category:Object={};//category["customerOpstion"][0]["options"]
   categories:any=[];
   
   modal=false;
   modalItem=false;
   isSelectOpGroup=-1;
   categoryOp={};
   showOption:String="";
   
   isSelectOpItem=-1;
   item:Object={};
   items:any=[];
   itemOp={}; 
   itemIndex:number=-1;
   categoryIndex:number=-1;
   isFlash=false;
   /*delSign:String="";*/

  	modalCondiments:boolean=false;
  
   childValue:any; 
    @ViewChild('uploadPic') uploadPic:ElementRef;
    showPic:ElementRef;
    showPicId:String;
	condiments:any=[];
	properties:any=[];
constructor(private myService:MyServiceService) { 
	this.properties.push({"name":"Recomment","key":false});
	this.properties.push({"name":"Spicy","key":false});
}
 ngOnInit() {
  	this.getCategories();
  	 this.init();
     this.initItemOp();
     this.getCondiments();

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
                   	this.appGlobal.isDel=false;
                     let tempItems=this.categories[this.categoryIndex].itemsDoc;
                         data["itemsDoc"]=tempItems;
                         this.categories[this.categoryIndex]=data;
                         this.category=data;
                     /*for(var i=0;i<this.categories.length;i++){

                         if(this.categories[i]["_id"]==this.category["_id"]){
                           
                           this.categories[i]=this.category;
                          
                           this.category=data;
                     
                          break;
                         }  
                      }*/
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
                    // for(let i=0;i<this.categories.length;i++){
                        // if(this.categories[i]["_id"]==data["_id"]){
                         let tempItems=this.categories[this.categoryIndex].itemsDoc;
                         data["itemsDoc"]=tempItems;
                         this.categories[this.categoryIndex]=data;
                         this.category=data;
                           this.categoryOp=data["customerOptions"][this.isSelectOpGroup];

                            //break;
                         }  
                      //}
                   //}
                 }
                
            )
   }
   saveCat(){
     console.log(this.categories[this.categoryIndex].items)
       if(!!this.category["_id"]){
  	  	this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                     let tempItems=this.categories[this.categoryIndex].itemsDoc;
                     data["itemsDoc"]=tempItems;
                     this.categories[this.categoryIndex]=data;
                     this.category=data;
                   	
     	             }
                 }
                
            )
  	  }else{
  	  		this.myService.service("/categories","post",this.category).subscribe(
               data=> {
                   if(!!data){
                    this.categoryIndex=this.categories.length;
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
                    	this.appGlobal.isDel=false;
                    	for(var i=0;i<this.categories.length;i++){
                    		 if(this.categories[i]["_id"]==item["_id"]){
                    		 	 this.categories.splice(i,1);
                    		 	 this.selectCat({})
                    		 	 this.categoryIndex=-1;
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
  	  if(this.isFlash){
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
  	  }
      
   // =
  }
  addItem(){
    this.item={};
    this.item["properties"]={};
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
      console.log("----------");

      this.item["properties"]["Recomment"]=this.item["properties"]["Recomment"] || false;
      this.item["properties"]["Spicy"]=this.item["properties"]["Spicy"] || false;
      this.isFlash=true;
      console.log(this.item);
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
                        this.itemOp=JSON.parse(JSON.stringify(this.item["customerOptions"][this.isSelectOpItem]));
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
   		this.isFlash=true;
     this.item["customerOptions"].splice(i,1);
     this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
               data=> {
                   if(!!data){
                   	   this.appGlobal.isDel=false;
                       this.initItemOp();
                  }
             
                 })
   }
     deleteItem(item){
this.isFlash=true;
     this.myService.service("/items/"+item["_id"],"delete").subscribe(
               data=> {
                   if(!!data){
                   	   this.appGlobal.isDel=false;
                       //this.initItemOp();
                       this.closeItem();
                       this.item={};

                  }
             
                 })
   }
   deleteItemOp(i){
    this.itemOp['options'].splice(i,1);
   }
    selectBnt(n){

    	if(this.appGlobal.currentPage=="Cat"){
    			this.category["globalOptions"]=n;
    			this.myService.service("/categories/"+this.category["_id"],"put",this.category).subscribe(
               data=> {
                   if(!!data){
                     data['itemsDoc']=this.category['itemsDoc'];
                   	this.category=data;
                    this.appGlobal.isSelect=false;
                   for(let i=0;i<this.categories.length;i++){
                         if(this.categories[i]["_id"]==data["_id"]){
                           this.categories[i]=data;
                           break;
                         }  
                      }
                   }
                 }
                
            )
    	}else{
    		this.isFlash=true;
    		this.item["globalOptions"]=n;
    		this.myService.service("/items/"+this.item["_id"],"put",this.item).subscribe(
               data=> {
                   if(!!data){
                   	this.item=data;
                           this.appGlobal.isSelect=false;
                   for(let i=0;i<this.items.length;i++){
                         if(this.items[i]["_id"]==data["_id"]){
                           this.items[i]=data;
                           break;
                         }  
                      }
                   }
                 }
                
            )
    	}
    	
    }
    deleteBnt(n){
    
    if(n==false && n!==0){
    	
    	this.appGlobal.isDel=false;
    	
         
         
      }else{

         if(isNaN(n)){
    	
    	 	 if(this.appGlobal.currentPage=="Cat"){
    	 	 	this.deleteCat(n);		
    	 	 }else{
    	 	 	this.deleteItem(n);	
    	 	 }
    	 	 
    	 }else{
    	 	
    	 	if(this.appGlobal.currentPage=="CatOp"){
    	 		this.deleteOpGroup(n);		
    	 	}else{
    	 		this.deleteItemGroupOp(n);
    	 	}
    	 	
    	 }
      }
   
    
  }
  delete(item){
  	var event = window.event;
  	if (event.stopPropagation) {
      event.stopPropagation();
    }  else {
      event.cancelBubble = true;
    }
  
  	this.childValue=item;
    this.appGlobal.isDel=true;
   }

upload(event): void {
  this.show(this.showPic,event.target.name);
}
show(pic,name):void{
 let file = this.uploadPic.nativeElement.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
          var dataURL = reader.result;
          pic.src=dataURL;
}
reader.readAsDataURL(file);
this.myService.upload("/uploadPic",file,name).subscribe(
               data=> {if(!!data && !!data.key){
                 if(this.showPicId=="picture"){
                     this.item["picture"]=data.value;
                  }else{


                 for(let i=0;i<this.categoryOp["options"].length;i++){
                   	    	let id=this.categoryOp["options"][i]["_id"] || this.categoryOp["options"][i]["key"];
                   	    	if(this.showPicId=="picture"+id){
                   	    		this.categoryOp["options"][i]["picture"]=data.value;
                   	    	   
                            this.uploadPic.nativeElement.value = "";
                   	    		break;

                   	    	}
                   	    }
                   	    for(let i=0;i<this.itemOp["options"].length;i++){
                   	    	let id=this.itemOp["options"][i]["_id"] || this.itemOp["options"][i]["key"];
                   	    	if(this.showPicId=="picture"+id){
                   	    		this.itemOp["options"][i]["picture"]=data.value;
                   	    	     
                              this.uploadPic.nativeElement.value = "";
                   	    		break;

                   	    	}
                   	    }
                      }
               	
               	}}
               	
                 
               );

  }
uploadPicture(event){
	  this.showPic=event.target;
	  this.showPicId=event.target.id;
      this.uploadPic.nativeElement.click();
  }
  selectCatCondiment(item){
  this.appGlobal.isSelect=true;
	for(let i=0;i<this.condiments.length;i++){
		this.condiments[i]["name"]=this.condiments[i]["group"];
		if(item["globalOptions"].toString().indexOf(this.condiments[i]["_id"])!=-1){
			this.condiments[i]["key"]=true;
		}else{
			this.condiments[i]["key"]=false;	
		}
		
	}
  }
   selectItemCondiment(item){
  	this.appGlobal.isSelect=true;
  	let opStr="";
  	if(!!item["globalOptions"]){
  	opStr=item["globalOptions"].toString();	
  	}
  	
	for(let i=0;i<this.condiments.length;i++){
		this.condiments[i]["name"]=this.condiments[i]["group"];
		if(opStr.indexOf(this.condiments[i]["_id"])!=-1){
			this.condiments[i]["key"]=true;
		}else{
			this.condiments[i]["key"]=false;	
		}
		
	}
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
