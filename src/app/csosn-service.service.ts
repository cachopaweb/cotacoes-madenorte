import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CSOSNServiceService {
  CSOSN: string[] = ['101', '102', '103', '201', '202', '203', '400', '500', '900'];
  constructor() { }

  getCSOSN(){
    return this.CSOSN;
  }
}
