package com.tvtak.tvtak.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "bio")
    private String bio;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Device> devices;

    public User()
    {

    }

    public long getId()
    {
        return this.id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getNAttribute(int n)
    {
        switch (n) 
        {
            case 0:
                return Long.toString(this.id);
            case 1:
                return this.email;
            case 2:
                return this.username;
            case 3:
                return this.password;
            case 4:
                return this.phone;
            case 5:
                return this.address;
            case 6:
                return this.bio;
            default:
                throw new IllegalArgumentException();
        }
    }

    public void setNAttribute(int n, String newVal)
    {
        switch (n) 
        {
            case 0:
                this.id = Long.parseLong(newVal);
            case 1:
                this.email = newVal;
            case 2:
                this.username = newVal;
            case 3:
                this.password = newVal;
            case 4:
                this.phone = newVal;
            case 5:
                this.address = newVal;
            case 6:
                this.bio = newVal;
            default:
                throw new IllegalArgumentException();
        }
    }
}