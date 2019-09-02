import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CSTServiceService {
  CST: string[] = ['00', '10', '20', '30', '40', '50', '60', '70', '90'];
  constructor() {     
  }

  getCST(){
    return this.CST;
  }
}
