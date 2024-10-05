package com.example.WebApplication.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "cart")
@Getter
@Setter
@Data
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;
    @OneToOne
    private Users users;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItems> cartItems;
    public Cart(Users users1){users = users1;}
}
