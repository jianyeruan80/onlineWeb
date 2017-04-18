import { Component, OnInit,EventEmitter ,AfterViewInit} from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { FormControl } from '@angular/forms';
import { PageViewComponent } from '../../page-view/page-view.component';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
	appGlobal = AppGlobal.getInstance();
    pvParent: EventEmitter<Object>;
    searchData:Object={};
    public data;

    config:Object={}
    customers:any=[];
     customer:Object={};
     searchInfo = new FormControl();
     status:boolean=true;
     modal:boolean=false;
     constructor(private myService:MyServiceService,private router:Router) {
        this.pvParent = new EventEmitter<Object>();
        this.config["total"]=0;
    	this.config["pageOnCount"]=30;
      	this.config["totalPage"]=0;
    	this.config["page"]=1;
        this.config["searchData"]={};
        this.config["searchData"]["status"]="true";
        }

  onChangePage(event){
  this.search(event.page);
  }
    ngOnInit(): void {
        this.search(1);

    }

    openCustomer(item){
    	this.customer=JSON.parse(JSON.stringify(item));
    	this.modal=true;

    }
    save(){
    		  this.myService.service("/customers/"+this.customer["_id"],"put",this.customer).subscribe(
		            data=> {
		            	if(!!data){
		            		this.search(this.config["page"]);
		            		this.modal=false;
		            	}
	               })
    }

    search(num) {
 
	        	this.myService.service("/customers/query","post",this.config).subscribe(
	               data=> {
	                   if(!!data){
                           console.log(data)
	                   	
	                      this.appGlobal.toastTime=0.5;
	                      this.config["total"]=data.total;
                          this.config["totalPage"]=Math.ceil(data.total/this.config["pageOnCount"]);
	                      this.customers=data.data;
                          this.pvParent.emit(this.config);
	                     
	                 }}
	                
	            )
    	   
    }

}


