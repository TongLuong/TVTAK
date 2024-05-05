package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.repository.*;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.*;

@Service
public class ScheduleService 
{
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private ScheduleRepository schedRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Transactional
    public Object createSchedule(Schedule schedule,
                                long user_id,
                                long device_id)
    {
        //find user by id
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isPresent())
        {
            schedule.setUser(userOptional.get());

            if (!em.contains(userOptional.get()))
                em.merge(userOptional.get());
        }

        // find device by id
        Optional<Device> deviceOptional = deviceRepository.findById(
                                                            device_id);
        Device device = null;
        if (deviceOptional.isPresent())
        {
            device = deviceOptional.get();

            if (!em.contains(device))
                em.merge(device);

            device.setSchedule(schedule);
        }

        schedRepository.save(schedule);

        if (device != null)
            deviceRepository.save(device);
        return device.getId();
    }

    @Transactional
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

            if (!em.contains(sched))
                em.merge(sched);

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

    @Transactional
    public void deleteSchedule(long schedule_id, long user_id)
    {
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isPresent())
        {
            if (userOptional.get().getId() != user_id)
                return;

            if (!em.contains(userOptional.get()))
                em.merge(userOptional.get());
        }
        else
            return;

        List<Device> devices = deviceRepository.findBySchedule_id(schedule_id);
        
        for (Device device : devices)
        {
            device.setSchedule(null);

            if (!em.contains(device))
                em.merge(device);

            deviceRepository.save(device);
        }

        schedRepository.deleteById(schedule_id);
    }

    public List<Schedule> getAllSchedules()
    {
        return schedRepository.findAll();
    }

    public void delete(Schedule schedule)
    {
        schedRepository.delete(schedule);
    }
}
