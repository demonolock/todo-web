package com.webforms.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultView {

    @GetMapping(value = "/")
    public String redirectExample() {
        return "forward:/auth.html";
    }
}