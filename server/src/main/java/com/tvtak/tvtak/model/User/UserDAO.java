package com.tvtak.tvtak.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserDAO 
{
    @Autowired
    private UserRepository repository;

    public void save(User user)
    {
        repository.save(user);
    }

    public List<User> getAllUsers()
    {
        List<User> users = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(users::add);
        return users;
    }

    public void delete(User user)
    {
        repository.delete(user);
    }
}
