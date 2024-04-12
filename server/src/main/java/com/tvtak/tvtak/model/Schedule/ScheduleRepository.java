package com.tvtak.tvtak.model.Schedule;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends CrudRepository<Schedule, Integer>
{
    
}
