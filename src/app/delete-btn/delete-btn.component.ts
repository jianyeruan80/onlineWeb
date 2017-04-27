import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { AppGlobal } from '../app-global';
@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})
export class DeleteBtnComponent implements OnInit {
 @Output() deleteBnt:EventEmitter<any>;
 @Input() childValue:any;

 appGlobal = AppGlobal.getInstance();
  constructor() { 
	this.deleteBnt = new EventEmitter<any>();
  //this.childValue= new EventEmitter<any>();
  }

  ngOnInit() {
  	 //  this.broadcastDel.subscribe((event) => this.fc=event);
  }
  ok(n){
      
      
      if(n==false){
        this.deleteBnt.emit(n);
      }else{
          this.deleteBnt.emit(this.childValue);  
      }


   }
stop(event){
 //   alert("OK")
   // event.stopPropagation();

  }
}
