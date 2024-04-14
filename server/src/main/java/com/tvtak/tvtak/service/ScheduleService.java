package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.repository.ScheduleRepository;
import com.tvtak.tvtak.repository.UserRepository;
import com.tvtak.tvtak.repository.DeviceRepository;

import java.util.*;

@Service
public class ScheduleService 
{
    @Autowired
    private ScheduleRepository schedRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    public void createSchedule(Schedule schedule, 
                                long user_id, 
                                long device_id)
    {
        //find user by id
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            schedule.setUser(user);
        }
        
        //find device by id
        Optional<Device> deviceOptional = deviceRepository.findById(device_id);
        if (deviceOptional.isPresent())
        {
            Device device = deviceOptional.get();
            Set<Device> temp = schedule.getDevices();
            if (temp == null)
                temp = new HashSet<>();
            
            temp.add(device);
            
            schedule.setDevices(temp);
        }
        
        try
        {schedRepository.save(schedule);
        }
        catch (Exception e)
        {
            System.out.println("yo" + e);
        }
    }

    public List<Schedule> getAllSchedules()
    {
        List<Schedule> schedules = new ArrayList<>();
        Streamable.of(schedRepository.findAll())
                    .forEach(schedules::add);
        return schedules;
    }

    public void delete(Schedule schedule)
    {
        schedRepository.delete(schedule);
    }
}
