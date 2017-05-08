import { Component, OnInit } from '@angular/core';

import {Router}  from '@angular/router';
@Component({

  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
stores:any=[];
constructor(private router:Router) {
   }

  ngOnInit() {
  /*if(location.pathname.indexOf('/admin/')==0){
  			this.router.navigate(['/admin'] );
  	}*/
  	console.log(location.pathname)
  }

}
