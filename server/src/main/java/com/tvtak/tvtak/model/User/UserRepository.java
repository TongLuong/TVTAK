package com.tvtak.tvtak.model.User;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>
{
    
}
