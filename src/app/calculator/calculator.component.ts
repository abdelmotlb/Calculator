import { Component, OnInit } from '@angular/core';
import { LinkappService } from 'src/service/linkapp.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {


  constructor( private httpClientObj: HttpClient ) { }



  //variables
  title = 'calculator';

  operand: string[] = ['0','0'];
  isZero: boolean[] = [true, true];
  OperandToStoreIn: number = 0;//
  usedOperand: number = 0;
  Operation: number = -1;
  DisplayedExpression: string = '';
  pressed: number = 0;
  prevpressed: number = 0;


  //action Listener:
  press(inVal: number){
    this.pressed = inVal;
    console.log(this.prevpressed);
    // virtual print
    console.log(this.operand[0] + " " + this.Operation + " " + this.operand[1]);

    //leading zeros.
    if( inVal == 0 && this.isZero[ this.usedOperand ] ){}
    
    //values and point.
    else if( inVal <= 10 ){
      if( inVal == 10 ) this.operand[ this.usedOperand ] += '.';
      else this.operand[ this.usedOperand ] += inVal.toString();
      this.isZero[ this.usedOperand ] = false;
    }
    
    // arithmetic operations: + - * /
    else if( 11 <= inVal && inVal <= 14 ){

      
      if( this.usedOperand == 0 ){ 
        this.Operation = inVal;
        this.usedOperand = 1; 
        this.operand[ this.usedOperand ] = "0"; 
        this.DisplayedExpression = parseFloat(this.operand[ 0 ]).toString() + this.PrimativeOperationsSymbol(inVal);
      }
      else if( this.usedOperand == 1 ){
        //equal evaluate and put in op0 and set operation
        this.EqualButton();
        this.Operation = inVal;
      }
    }
    
    // one operands operations: sqrt x.x 1/x %
    else if( 15 <= inVal && inVal <= 18 ){
      if( this.usedOperand == 0 ){
        // no need for '='
        // evaluate
        // store in op0
        this.Operation = inVal;
        this.EqualButton();
        this.usedOperand = 0;

      }else if( this.prevpressed != 20 ){ /*laugh....*/
        this.OperandToStoreIn = 1;
        this.linkWithBack( this.operand[1], inVal, "0" );
        console.log("here");
      }else {
        this.Operation = inVal;
        this.EqualButton();
        this.usedOperand = 0;
      }
    }

    // backspace
    else if( inVal == 19 ){
      if(this.operand[ this.usedOperand ].length != 1)
        this.operand[ this.usedOperand ] = this.operand[ this.usedOperand ].slice(0, -1);
      if( this.operand[ this.usedOperand ].length == 1 )
        this.isZero[ this.usedOperand ] = true;
    }

    // equal
    else if( inVal == 20 ){
      this.EqualButton();
    }

    // reset
    else if( inVal == 21 || inVal == 22 ){
      this.ResetButton();
    }

    else {
      if( this.operand[ this.usedOperand ][0] != '-' )
        this.operand[ this.usedOperand ] = '-' + this.operand[ this.usedOperand ];
      else
        this.operand[ this.usedOperand ] = this.operand[ this.usedOperand ].substring(1,this.operand[ this.usedOperand ].length);
    }

    this.prevpressed = inVal;
  }

  EqualButton(){

    //division by zero
    if( this.Operation == 14 && parseFloat(this.operand[1]) == 0 ){
      // reset
      this.ResetButton();
      return;
    }

    else{
      //evaluate
      this.OperandToStoreIn = 0;

      // if(11 <= this.Operation && this.Operation <= 14)
      //   this.DisplayedExpression = parseFloat(this.operand[0]).toString() + this.PrimativeOperationsSymbol(this.Operation) + parseFloat(this.operand[1]).toString();
      // else
      //   this.DisplayedExpression = this.PrimativeOperationsSymbol(this.Operation) + parseFloat(this.operand[0]).toString();
      
      this.linkWithBack( this.operand[0], this.Operation, this.operand[1] );
      //op0 = out
      this.usedOperand = 1;
      this.operand[1] = '0';
    }

  }

  ResetButton(){
    this.usedOperand = 0;
    this.operand[0] = "0";
    this.operand[1] = "0";
    this.Operation = -1;
    this.DisplayedExpression = "";
  }

  PrimativeOperationsSymbol(In: number){
    switch(In) {
        case 11: return '+';
        case 12: return '-';
        case 13: return '*';
        case 14: return '/';
        case 15: return 'sqRoot';
        case 16: return 'sqrt';
        case 17: return '(1/';
        case 18: return 'perc';
        default: return '';
    }
  }


  // http service..........
  output:string = ''; 
  addTempstr: string = '';
  linkWithBack(operand1: string, operation: number, operand2: string) {

    this.httpClientObj.get('http://localhost:8080/Back/operationAccess', {
      
      responseType: 'text',
      
      params: {
        x: operand1,
        Operation: operation,
        y: operand2,
      },
      
      observe: 'response',
    }
    //end response parameters.

    ).subscribe(response => { 
      this.output = response.body + "";
      this.operand[ this.OperandToStoreIn ] = this.output;

      // handling display screen cases.
      if(this.OperandToStoreIn)  this.addTempstr = this.DisplayedExpression;
      this.DisplayedExpression = this.output;
      if(11 <= this.pressed && this.pressed <= 14) this.DisplayedExpression += this.PrimativeOperationsSymbol(this.pressed);
      else if( this.OperandToStoreIn ) this.DisplayedExpression = this.addTempstr + this.output;
      console.log( this.OperandToStoreIn + ' out' );
    });
  }

  ngOnInit(): void {
  }

}
