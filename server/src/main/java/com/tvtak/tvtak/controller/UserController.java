package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.User.UserNoPassword;
import com.tvtak.tvtak.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/v1/user")
public class UserController
{
    @Autowired
    private UserService userService;
    @PostMapping("/register-account")
    public ResponseEntity<Object> newUser(@RequestBody User user) {
        try {
            this.userService.registerAccount(user);
            return ResponseEntity.status(HttpStatus.OK).body("register account success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register: " + e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<Object> handleLogin(@RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            UserNoPassword infoUser = this.userService.handleLoginService(email, password);

            if (infoUser != null) {
                return new ResponseEntity<>(infoUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Login failed", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.BAD_REQUEST);
        }
    }


}
