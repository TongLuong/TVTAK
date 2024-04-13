package com.tvtak.tvtak.services;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.User.UserNoPassword;
import com.tvtak.tvtak.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Service
public class UserService {
    @Autowired
    private  UserRepository userRepository;

    public void registerAccount(User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Hash the user's password
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        // Set the hashed password to the user object
        user.setPassword(hashedPassword);

        this.userRepository.save(user);
    }
    public UserNoPassword handleLoginService(String email, String password){
        User user = this.userRepository.findByEmail(email);
        if (user != null ) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(password, user.getPassword())) {
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

}
