package com.misoft.cafe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class aman {
    @GetMapping(path="/hello")
    public String getdata(){
        return "hello";
    }

}
