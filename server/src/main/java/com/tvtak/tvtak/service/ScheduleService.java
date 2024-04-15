package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
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
