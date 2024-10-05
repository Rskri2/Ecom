package com.example.WebApplication.service;

import com.example.WebApplication.model.Users;
import com.example.WebApplication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    JwtService service;
    @Autowired
    UserRepo repo;
    @Autowired
    AuthenticationManager manager;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
//    public UserService(@Value("${strength}")int pro){
//        encoder = new BCryptPasswordEncoder(pro);
//    }
    public String verifyUser(Users user) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));;
        System.out.println(user.getPassword());
        if(authentication.isAuthenticated())
        return service.generateToken(user.getUsername());
        else return "fail";
    }

    public Users addUser(Users user) {

        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }
}
