package com.tvtak.tvtak.model.Schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ScheduleDAO 
{
    @Autowired
    private ScheduleRepository repository;

    public void save(Schedule schedule)
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
