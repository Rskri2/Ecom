package com.example.WebApplication.controller;


import com.example.WebApplication.model.Users;
import com.example.WebApplication.service.JwtService;
import com.example.WebApplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserService service;
    @Autowired
    JwtService jwtService;
    @PostMapping("/login")
    public String login(@RequestBody Users user){
        return service.verifyUser(user);
    }

    @PostMapping("/register")
    public String register(@RequestBody Users user){
        Users user1 = service.addUser(user);
        return jwtService.generateToken(user.getUsername());
    }
}
