package com.example.WebApplication.service;

import com.example.WebApplication.model.Cart;
import com.example.WebApplication.model.CartItems;
import com.example.WebApplication.model.Product;
import com.example.WebApplication.model.Users;
import com.example.WebApplication.repository.CartItemsRepo;
import com.example.WebApplication.repository.CartRepo;
import com.example.WebApplication.repository.ProductRep;
import com.example.WebApplication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    UserRepo repo;
    @Autowired
    CartRepo cartRepo;
    @Autowired
    CartItemsRepo cartItemsRepo;
    @Autowired
    ProductRep productRep;
    public List<?> getCartItems(Users user){
        Cart cart = user.getCart();
        if(cart == null) {
            cart = new Cart(user);
            user.setCart(cart);
            cartRepo.save(cart);
        }
        return cart.getCartItems();
//        return new ResponseEntity<>(cart.getCartItems(), HttpStatus.OK);
    }
    public void updateCartItems(int itemId, int quantity){
        CartItems cartItems = cartItemsRepo.findById(itemId).orElseThrow();
        cartItems.setQuantity(quantity);
        cartItemsRepo.save(cartItems);
    }
    public void deleteProduct(Users user, int itemId){
        Cart c = user.getCart();
        CartItems cartItems = cartItemsRepo.findById(itemId).orElseThrow();
        cartItemsRepo.delete(cartItems);
        user.getCart().getCartItems().remove(cartItems);
        user.setCart(user.getCart());
    }
    public void addProduct(Users user, int prodId, int qty){
        Cart c = user.getCart();
        List<CartItems> cpp= c.getCartItems();
        if(cpp.stream().anyMatch(cartItems -> cartItems.getProduct().getId() == prodId)){
            return;
        }
        Product p = productRep.findById(prodId).orElseThrow();
        CartItems cartItems = new CartItems(p, qty, c);
        cartItemsRepo.save(cartItems);
        user.getCart().getCartItems().add(cartItems);
    }
}
