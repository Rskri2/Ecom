package com.example.WebApplication.service;

import com.example.WebApplication.model.Product;
import com.example.WebApplication.repository.ProductRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRep repo;
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProduct(int id) {

        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product p) {
        return repo.save(p);
    }

    public Product updateProduct(int id, Product p) {
        return repo.save(p);
    }

    public void deleteProduct(int id) {
         repo.deleteById(id);
    }

//    public List<Product> searchProducts(String keyword) {
//
//    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}
