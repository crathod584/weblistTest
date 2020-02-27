import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HelperService {
 
  redirectUrl:string;
    
  constructor() { }
  
  setData(itemName,data){
    localStorage.setItem(itemName, JSON.stringify(data));
  }

  getData(itemName){
    return JSON.parse(localStorage.getItem(itemName));
  }

  getKeyData(itemName,key){
    return JSON.parse(localStorage.getItem(itemName))[key];
  }
  
  clearData(){
    localStorage.clear();
  }
}

