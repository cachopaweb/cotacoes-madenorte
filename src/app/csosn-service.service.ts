import { Injectable } from '@angular/core';
import { TCsosn } from './Model/TCsosn';

@Injectable({
  providedIn: 'root'
})
export class CSOSNServiceService {
  CSOSN: TCsosn[] = [
    new TCsosn(1, '101'), 
    new TCsosn(2, '102'), 
    new TCsosn(3, '103'), 
    new TCsosn(4, '201'), 
    new TCsosn(5, '202'), 
    new TCsosn(6, '203'), 
    new TCsosn(7, '400'), 
    new TCsosn(8, '500'), 
    new TCsosn(9, '900')
  ];
  constructor() { }

  getCSOSN(){
    return this.CSOSN;
  }
}
