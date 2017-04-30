import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 transform(value: any, args: any[]): any {
    if (!value) return value;

     switch (args[0]) {
      
       case "GloGroup":
       var opStr="";
       
       for(let i=0;i< args[1].length;i++){
          if(value.toString().indexOf(args[1][i]["_id"])!=-1){
             opStr+=args[1][i].group+" , "
          }
       }
        // let str="";
         /* for(let i=0;i<value.length;i++){
              str+=value[i]["group"]+" , "
          }*/
       return opStr ;
       
      case "OpGroup":
          let str="";
          for(let i=0;i<value.length;i++){
              str+=value[i]["group"]+" , "
          }
       return str ;
      case "ID":
              if(!!value){
                return value;
                } else{
                  return new Date().getTime();
                } 
        
      
     	case "=":
     		if(typeof(args[1])=="object"){
     				let key = Object.keys(args[1])[0];
     				return value.filter(item =>item[key]==args[1][key]);
     				
     		}else{
     			return value.filter(item =>item==args[1]);
     		}
     	case "!=":
     		if(typeof(args[1])=="object"){
     				return [];
     		}else{
     			return value.filter(item =>item !=args[1]);
     		}
     	  case "objectToArray":
     	  return Object.keys(value).map(key => value[key]);
        case "objectToStr":
        return JSON.stringify(value);
     }
 }    
}
/*
 transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
:filter[0,1]

transform(value: any, args: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.args(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }
}*/

