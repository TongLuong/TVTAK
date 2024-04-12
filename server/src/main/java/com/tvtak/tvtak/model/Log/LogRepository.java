package com.tvtak.tvtak.model.Log;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends CrudRepository<Log, Integer>
{
    
}
