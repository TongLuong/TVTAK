package com.tvtak.tvtak.model.User;

import jakarta.persistence.Column;

public class UserNoPassword {
    private long id;
    private String email;
    private String username;
    private String phone;
    private String address;
    private String bio;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public UserNoPassword(long id, String email, String username, String phone, String address, String bio) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.phone = phone;
        this.address = address;
        this.bio = bio;
    }
}
