package com.example.demo.testcontroller;

import com.example.demo.calcLogic.CalculatorLogic;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/Back")
public class controller {
    CalculatorLogic cl = new CalculatorLogic();

    @GetMapping("/operationAccess")
    public String connectionWithFrontFun(@RequestParam String x, @RequestParam int Operation, @RequestParam String y){
        double operand1 = Double.parseDouble(x);
        double operand2 = Double.parseDouble(y);
        return cl.directing(operand1, Operation, operand2);
    }
}
