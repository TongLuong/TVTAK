package com.tvtak.tvtak.model.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    private long id;

    @Column(name = "email", nullable = false, unique = true)
    @Setter @Getter
    private String email;

    @Column(name = "username", nullable = false, unique = true)
    @Setter @Getter
    private String username;

    @Column(name = "password")
    @Setter @Getter
    private String password;

    @Column(name = "phone")
    @Setter @Getter
    private String phone;

    @Column(name = "address")
    @Setter @Getter
    private String address;

    @Column(name = "bio")
    @Setter @Getter
    private String bio;
}