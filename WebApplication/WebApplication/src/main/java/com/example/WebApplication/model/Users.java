package com.example.WebApplication.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "users")
@Getter
@Setter
@Data
public class Users {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    @OneToOne
    private Cart cart;
    @Override
    public String toString() {
                return "Users{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
