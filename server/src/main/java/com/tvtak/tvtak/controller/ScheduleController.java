package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.service.ScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

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
            
            return new ResponseEntity<>("schedule created successfully", HttpStatus.OK);
        }
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/edit-schedule")
    public ResponseEntity<Object> editSched(
        @RequestBody Schedule sched,
        @RequestParam long schedule_id,
        @RequestParam long user_id)
    {
        try
        {
            if (!this.schedService.editSchedule(sched,
                                                schedule_id,
                                                user_id))
                return new ResponseEntity<>("schedule not found", HttpStatus.NOT_FOUND);
            
            return new ResponseEntity<>("schedule edited successfully", HttpStatus.OK);
        }
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all-schedule")
    public ResponseEntity<List<Schedule>> getAllSchedByUser(
        @RequestParam long user_id)
    {
        try
        {
            List<Schedule> res = this.schedService.getAllSchedByUser(
                                                            user_id);
            
            if (res == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-schedule")
    public ResponseEntity<Object> deleteSched(
        @RequestParam long schedule_id,
        @RequestParam long user_id)
    {
        try
        {
            this.schedService.deleteSchedule(schedule_id, user_id);
            
            return new ResponseEntity<>("delete schedule successfully", HttpStatus.OK);
        }
        catch (Exception e) 
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
