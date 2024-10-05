package com.example.WebApplication.controller;

import com.example.WebApplication.model.Users;
import com.example.WebApplication.repository.UserRepo;
import com.example.WebApplication.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173",
        methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.OPTIONS},
        allowCredentials = "true")
@RequestMapping("/api")
@RestController
public class CartController {
    @Autowired
    UserRepo repo;
    @Autowired
    CartService cartService;
    @RequestMapping("/carts")
    public ResponseEntity<List<?>> cartItems(HttpServletRequest request){
        final Users user = repo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        List<?> cartItems= cartService.getCartItems(user);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }
    @PutMapping("/carts/{itemId}/{quantity}")
    public ResponseEntity<?> updateProduct(@PathVariable int quantity, @PathVariable int itemId){
        cartService.updateCartItems(itemId, quantity);
        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
    }
    @GetMapping("/carts/{prodId}/{qty}")
    public ResponseEntity<?> addProduct(@PathVariable int qty, @PathVariable int prodId){
        final Users user = repo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        cartService.addProduct(user, prodId, qty);
        return new ResponseEntity<>("Product added successfully",HttpStatus.OK);
    }
    @DeleteMapping("/carts/{itemId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int itemId){
        final Users user = repo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        cartService.deleteProduct(user, itemId);
        return new ResponseEntity<>("Product deleted successfully",HttpStatus.OK);
    }
}
