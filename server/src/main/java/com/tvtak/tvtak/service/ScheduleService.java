package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.repository.*;

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
            schedule.setUser(userOptional.get());

        // find device by id
        Optional<Device> deviceOptional = deviceRepository.findById(
                                                            device_id);
        Device device = null;
        if (deviceOptional.isPresent())
        {
            device = deviceOptional.get();
            device.setSchedule(schedule);
        }

        schedRepository.save(schedule);

        if (device != null)
            deviceRepository.save(device);
    }

    public boolean editSchedule(Schedule schedule,
                                long schedule_id,
                                long user_id)
    {
        // find schedule by id
        Optional<Schedule> schedOptional = schedRepository.findById(
                                                            schedule_id);
        if (schedOptional.isPresent())
        {
            Schedule sched = schedOptional.get();
            if (sched.getUser().getId() == user_id)
            {
                sched.assignNew(schedule);
                schedRepository.save(sched);
                return true;
            }
        }
        return false;
    }

    public List<Schedule> getAllSchedByUser(long user_id)
    {
        return schedRepository.findByUser_id(user_id);
    }

    public void deleteSchedule(long schedule_id, long user_id)
    {
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isPresent())
        {
            if (userOptional.get().getId() != user_id)
                return;
        }
        else
            return;

        List<Device> devices = deviceRepository.findBySchedule_id(schedule_id);
        
        for (Device device : devices)
        {
            device.setSchedule(null);
            deviceRepository.save(device);
        }

        schedRepository.deleteById(schedule_id);
    }

    public List<Schedule> getAllSchedules()
    {
        List<Schedule> schedules = schedRepository.findAll();
        return schedules;
    }

    public void delete(Schedule schedule)
    {
        schedRepository.delete(schedule);
    }
}
