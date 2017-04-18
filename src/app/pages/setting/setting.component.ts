import { Component, OnInit,ViewContainerRef,ViewChild } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
  settingList:any=[];
  isSelect:Number=0;
  settingForm:Object=  {};
  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,private storeService: LocalStorageService) { 
  	 this.settings();
  }
  ngOnInit() {
    this.aRoute.params.subscribe(params => {
                this.appGlobal.userInfo={};
                this.appGlobal.userInfo["accessToken"]=params.token;
     });
   
  }
  select(item){
  	//this.currentItem=item;
  	this.settingForm=JSON.parse(JSON.stringify(item));
  	
  }
  settings(){
  		this.myService.service("/settings/merchant/id","get").subscribe(
               data=> {
                   if(!!data){
                   	this.settingForm={};
                   	this.settingList=data;
                   	this.settingForm=data[0];

            }
                 }
                
            );
  }
  changeList(data){
  	for(var i=0;i<this.settingList.length;i++){
  		  if(data["_id"]==this.settingList[i]["_id"]){
  		  	
  		  	this.settingList[i]=data;
  		  }
  	}
  }
  save(){

  		this.myService.service("/settings/"+this.settingForm["_id"],"put",this.settingForm).subscribe(
               data=> {
                   if(!!data){
                   	this.settingForm=data;
                   	 this.changeList(data);
                  	

            }
                 }
                
            );
  }

}
