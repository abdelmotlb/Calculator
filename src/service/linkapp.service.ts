import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LinkappService {

  constructor( private httpClientObj: HttpClient ) { }

  private output:string = ''; 
  private tempOutput: number = 0;

  linkWithBack(operand1: string, operation: number, operand2: string) {

    this.httpClientObj.get('http://localhost:8080/Back/operationAccess', {
      
      responseType: 'text',
      
      params: {
        x: operand1,
        oper: operation,
        y: operand2,
      },
      
      observe: 'response',
    }
    //end response parameters.

    ).subscribe(response => { 
      this.output = response.body + "" 
      this.tempOutput = parseFloat(this.output)});
    return this.tempOutput;
  }
  
}
