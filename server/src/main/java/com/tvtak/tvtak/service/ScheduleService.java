package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.repository.ScheduleRepository;

import java.util.*;

@Service
public class ScheduleService 
{
    @Autowired
    private ScheduleRepository repository;

    public void createSchedule(Schedule schedule)
    {
        repository.save(schedule);
    }

    public List<Schedule> getAllSchedules()
    {
        List<Schedule> schedules = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(schedules::add);
        return schedules;
    }

    public void delete(Schedule schedule)
    {
        repository.delete(schedule);
    }
}
