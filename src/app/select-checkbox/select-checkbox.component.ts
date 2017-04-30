import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { AppGlobal } from '../app-global';

@Component({
  selector: 'app-select-checkbox',
  templateUrl: './select-checkbox.component.html',
  styleUrls: ['./select-checkbox.component.css']
})
export class SelectCheckboxComponent implements OnInit {
   
  appGlobal = AppGlobal.getInstance();
   @Output() selectBnt:EventEmitter<any>;
   @Input() childValue:any;
   returnList:any=[];
  constructor() { 
	this.selectBnt = new EventEmitter<any>();
  }
  ngOnInit() { }
  ok(n){
  	  this.returnList=[];
  	  for(let i=0;i<this.childValue.length;i++){
  	  	 if(this.childValue[i]["key"]==true){
  	  	 	this.returnList.push(this.childValue[i]["_id"]);
  	  	 }
  	  }
      this.selectBnt.emit(this.returnList);  
   }
stop(event){}
}
