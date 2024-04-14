package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.service.ScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController
{
    @Autowired
    private ScheduleService schedService;

    @PostMapping("/create-schedule")
    public ResponseEntity<Object> newSched(
        @RequestBody Schedule sched,
        @RequestParam long user_id,
        @RequestParam long device_id)
    {
        try
        {
            this.schedService.createSchedule(sched, user_id, device_id);
            
            return new ResponseEntity<>("account registered successfully", HttpStatus.OK);
        }
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
