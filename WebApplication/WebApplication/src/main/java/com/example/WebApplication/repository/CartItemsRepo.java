package com.example.WebApplication.repository;

import com.example.WebApplication.model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemsRepo extends JpaRepository<CartItems, Integer> {
}
