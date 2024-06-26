package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.User.UserNoPassword;
import com.tvtak.tvtak.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController
{
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Object> newUser(@RequestBody User user) 
    {
        try 
        {
            Object[] res = this.userService.registerAccount(user);
            if ((boolean)res[0])
                return new ResponseEntity<>(res[1], HttpStatus.OK);
            
            return new ResponseEntity<>("account is already taken", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/signin")
    public ResponseEntity<Object> handleLogin(
        @RequestParam("account") String account, 
        @RequestParam("password") String password)
    {
        try 
        {
            UserNoPassword infoUser = this.userService.handleLoginService(account, password);

            if (infoUser != null)
                return new ResponseEntity<>(infoUser, HttpStatus.OK);
            
            return new ResponseEntity<>("login failed", HttpStatus.UNAUTHORIZED);
        } 
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all-users")
    public ResponseEntity<List<User>> handleLogin()
    {
        try 
        {
            List<User> allUsers = this.userService.getAllUser();
            return new ResponseEntity<>(allUsers, HttpStatus.OK);
        } 
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
