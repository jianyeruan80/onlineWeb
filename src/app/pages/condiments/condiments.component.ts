import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
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
    @ViewChild('uploadPic') uploadPic:ElementRef;
    //showPic:ElementRef;
    showPic:ElementRef;
    showPicId:String;
    /*@ViewChild('showPic') showPic:ElementRef;*/
   condiment:Object={}; 
   condiments:any=[];
   isSelect:number=-1;
   childValue:any;
  constructor(private myService:MyServiceService,public elementRef: ElementRef) { }
   ngOnInit() {
    	this.getCondiments();
       this.init();
    }
  init(){
     this.condiment={};
     this.condiment['options']=[];
  	 this.condiment['options'].push({"key":new Date().getTime(),"name":"","price":"","order":"","picture":""});
  }
  addOp(){
   this.condiment['options'][this.condiment['options'].length]={"key":new Date().getTime(),"name":"","price":"","order":"","picture":""};

  }
  deleteOp(i){
    this.condiment['options'].splice(i,1);
  }

  save(){
  		 if(this.condiment["_id"]){
  	  	  this.myService.service("/globalOptionGroups/"+this.condiment["_id"],"put",this.condiment).subscribe(
               data=> {
                   if(!!data){
                     this.condiment=data;
                   	 for(var i=0;i<this.condiments.length;i++){
                    		 if(this.condiments[i]["_id"]==data["_id"]){
                    		 	 this.condiments[i]=data;
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
                   	}
                   
                  	
                 }
                
            );
  	  }
  	  
  }
  select(item){
  	this.condiment=JSON.parse(JSON.stringify(item));
  }
   delete(item){
    this.childValue=item;
    this.appGlobal.isDel=true;
    }
   deleteBnt(n){
    	
   
    if(n !=false){
        
  	      this.myService.service("/globalOptionGroups/"+n["_id"],"delete").subscribe(
               data=> {
                    if(!!data){
                    	for(var i=0;i<this.condiments.length;i++){
                    		 if(this.condiments[i]["_id"]==n["_id"]){
                    		 	 this.condiments.splice(i,1);
                    		 	 this.init();
                    		 	 this.isSelect=-1;
                    		 	 this.appGlobal.isDel=false;
                    		 	 break;
                    		 }	
                    	}
                    	
                    }
                    }
                 )
         
      }else{
        this.appGlobal.isDel=false;
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
 upload(event): void 
 {
 
  this.show(this.showPic,event.target.name);
}
show(pic,name):void{
 
 let file = this.uploadPic.nativeElement.files[0];
 
          if (file.type.indexOf("image")!=-1) {
          var reader = new FileReader();
          reader.onload = function(e) {
          var dataURL = reader.result;
          pic.src=dataURL;
      

}
reader.readAsDataURL(file);
this.myService.upload("/uploadPic",file,name).subscribe(
               data=> {if(!!data && !!data.key){
                 for(let i=0;i<this.condiment["options"].length;i++){
                   	    	let id=this.condiment["options"][i]["_id"] || this.condiment["options"][i]["key"];
                   	    	if(this.showPicId=="picture"+id){
                   	    		this.condiment["options"][i]["picture"]=data.value;
                            
                            this.uploadPic.nativeElement.value = "";

                   	    		
                   	    		break;

                   	    	}
                   	    }
               	}}
               	
                 
               );
               }

  }
uploadPicture(event){
     this.uploadPic.nativeElement.click();
     this.showPic=event.target;
	   this.showPicId=event.target.id;
      
  }
}
