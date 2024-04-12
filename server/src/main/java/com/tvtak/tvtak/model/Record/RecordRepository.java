package com.tvtak.tvtak.model.Record;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends CrudRepository<Record, Integer>
{
    
}
