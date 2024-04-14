package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Schedule.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>
{
    
}
