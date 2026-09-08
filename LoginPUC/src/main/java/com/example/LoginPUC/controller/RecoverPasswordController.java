package com.example.LoginPUC.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RecoverPasswordController {
    @GetMapping("recoverpassword")
    public String register(){
        return "recoverpassword";
    }
}
