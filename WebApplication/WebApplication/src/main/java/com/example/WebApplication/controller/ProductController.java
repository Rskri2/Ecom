package com.example.WebApplication.controller;

import com.example.WebApplication.model.Product;
import com.example.WebApplication.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173",
        methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.OPTIONS},
allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService service;
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProduct(){
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK) ;
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable int id){
        Product p = service.getProduct(id);
        if(p != null){
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        else   return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody Product p){

        try{
            Product p1 = service.addProduct(p);
            return new ResponseEntity<>(p1, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody Product p){

        Product p1 = service.updateProduct(id, p);
        if(p1 != null) return new ResponseEntity<>("Updated", HttpStatus.OK);
        return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product p = service.getProduct(id);
        if(p == null) return new ResponseEntity<>("Product not found",HttpStatus.BAD_REQUEST);
        service.deleteProduct(id);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    @GetMapping("/products/search")
    public ResponseEntity<?> searchProduct(@RequestParam String keyword){
        return new ResponseEntity<>(service.searchProducts(keyword), HttpStatus.OK);
    }
    @GetMapping("/products/category")
    public ResponseEntity<?> searchByCategory(@RequestParam String keyword){
        return new ResponseEntity<>(service.searchCategory(keyword), HttpStatus.OK);
    }

}
