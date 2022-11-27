package com.example.demo.calcLogic;
import java.lang.*;
import static java.lang.Integer.MIN_VALUE;

public class CalculatorLogic {

    public String directing(double operand1, int oper,double operand2){
        double ans = MIN_VALUE;
        switch(oper) {
            case 11: ans = Add(operand1, operand2); break;
            case 12: ans = Sub(operand1, operand2); break;
            case 13: ans = Mult(operand1, operand2); break;
            case 14: ans = Div(operand1, operand2); break;
            case 15: ans = SqRoot(operand1); break;
            case 16: ans = Pow2(operand1); break;
            case 17: ans = MultInv(operand1); break;
            case 18: ans = Perc(operand1); break;
        }
        return Double.toString(ans);
    }

    double Sub(double x, double y){
        return x - y;
    }

    double Add(double x, double y){
        return x + y;
    }

    double Mult(double x, double y){
        return x * y;
    }

    double Div(double x, double y){
        return x / y;
    }

    double Pow2(double x){
        return x * x;
    }

    double SqRoot(double x){
        return Math.sqrt(x);
    }

    double MultInv(double x){
        return 1/x;
    }

    double Perc(double x){
        return x/100;
    }

}

