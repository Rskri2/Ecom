package com.example.WebApplication.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cartitems")
@Getter
@Setter
@NoArgsConstructor
@Data
public class CartItems {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Product product;
    @JsonIgnore
    @ManyToOne
    private Cart cart;
    private int quantity;

    @Override
    public String toString() {
        return "CartItems{" +
                "id=" + id +
                ", product=" + product +
                ", cart=" + cart +
                ", quantity=" + quantity +
                '}';
    }

    public CartItems(Product product1, int qty, Cart cart1){
        cart = cart1; quantity = qty; product = product1;
    }
}
