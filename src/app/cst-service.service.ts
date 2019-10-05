import { Injectable } from '@angular/core';
import { TCst } from './Model/TCst';

@Injectable({
  providedIn: 'root'
})
export class CSTServiceService {
  CST: TCst[] = [
      new TCst(1, '00'), 
      new TCst(2, '10'), 
      new TCst(3, '20'), 
      new TCst(4, '30'), 
      new TCst(5, '40'), 
      new TCst(6, '50'), 
      new TCst(7, '60'), 
      new TCst(8, '70'), 
      new TCst(9, '90')
  ];
  constructor() {     
  }

  getCST(){
    return this.CST;
  }
}
