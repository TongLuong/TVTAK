package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.service.ScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/user")
public class ScheduleController
{
    @Autowired
    private ScheduleService schedService;

    @PostMapping("/signup")
    public ResponseEntity<Object> newUser(@RequestBody Schedule sched) 
    {
        try 
        {
            // if (this.schedService.createSchedule(sched))
            //     return new ResponseEntity<>("account registered successfully", HttpStatus.OK);
            
            return new ResponseEntity<>("account is already taken", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
