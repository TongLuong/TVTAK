package com.tvtak.tvtak.service;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.User.UserNoPassword;
import com.tvtak.tvtak.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.*;

@Service
public class UserService 
{
    @Autowired
    private UserRepository userRepository;

    public void delete(User user)
    {
        userRepository.delete(user);
    }

    public boolean registerAccount(User user)
    {
        if (this.userRepository.findByEmail(user.getEmail()) != null
        || this.userRepository.findByEmail(user.getUsername()) != null)
            return false;

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Hash the user's password
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        // Set the hashed password to the user object
        user.setPassword(hashedPassword);

        this.userRepository.save(user);
        return true;
    }

    public UserNoPassword handleLoginService(String account, String password)
    {
        User user = this.userRepository.findByEmail(account);
        if (user == null)
            user = this.userRepository.findByUsername(account);
        
        if (user != null)
        {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(password, user.getPassword()))
            {
                // Passwords match, return UserNoPassword object
                return new UserNoPassword(
                        user.getId(),
                        user.getEmail(),
                        user.getUsername(),
                        user.getPhone(),
                        user.getAddress(),
                        user.getBio());
            }
        };
        return null;
    }

    public List<User> getAllUser()
    {
        List<User> users = userRepository.findAll();
        return users;
    }
}
