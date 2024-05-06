package com.tvtak.tvtak.service;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.repository.*;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.model.Schedule.Schedule;

import java.util.*;

@Service
public class DeviceService 
{
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdafruitConnection adafruitConnection;

    @Transactional
    public Object save(Device device, long id, boolean createFeed)
    {
        if (isExist(device.getName()))
        {
            return "device is exist";
        }

        //find user by id
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();

            if (!em.contains(user))
                em.merge(user);

            device.setUser(user);
        }

        long res = -1;
        try
        {
            res = this.deviceRepository.save(device).getId();

            if (createFeed)
            {
                this.adafruitConnection.createFeed(device.getName());
                if (device.getSwitch_name() == null)
                    this.adafruitConnection.createFeed("manual-" + device.getName());
                else
                    this.adafruitConnection.createFeed(device.getSwitch_name());
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return res;
    }

    public boolean isExist(String name)
    {
        return this.deviceRepository.findByName(name) != null;
    }

    public List<Device> getAllDevices(long user_id)
    {
        return this.deviceRepository.findByUserId(user_id);
    }

    @Transactional
    public String delete(long device_id, long user_id)
    {
        try
        {
            Optional<Device> deviceOptional = Optional.ofNullable(deviceRepository.findByIdAndUserId(device_id, user_id));
            if (deviceOptional.isPresent())
            {
                Device device = deviceOptional.get();
                
                if (!em.contains(device))
                    em.merge(device);

                adafruitConnection.deleteFeed(device.getName());
                adafruitConnection.deleteFeed(device.getSwitch_name());
                deviceRepository.delete(device);

                return "Delete success";
            } else {
                return "Device not found for the user";
            }

        }
        catch (Exception e)
        {
            return "Failed to delete";
        }
    }

    @Transactional
    public String toggleStatus(long device_id, long user_id, int status)
    {
        try
        {
            Optional<Device> deviceOptional = Optional.ofNullable(deviceRepository.findByIdAndUserId(device_id, user_id));
            if (deviceOptional.isPresent())
            {
                Device device = deviceOptional.get();

                if (!em.contains(device))
                    em.merge(device);

                String data = String.valueOf(status);
                adafruitConnection.sendFeedData(data, device.getSwitch_name());

                device.setStatus(status);
                deviceRepository.save(device);

                return "Status updated successfully";
            } else {
                return "Device not found for the user";
            }
        }
        catch (Exception e)
        {
            return "Failed to update status";
        }
    }

    @Transactional
    public String adjustThreshold(long device_id, long user_id, Double threshold)
    {
        try
        {
            Optional<Device> deviceOptional = Optional.ofNullable(deviceRepository.findByIdAndUserId(device_id, user_id));
            if (deviceOptional.isPresent())
            {
                Device device = deviceOptional.get();

                if (!em.contains(device))
                    em.merge(device);

                device.setThreshold(threshold);
                deviceRepository.save(device);

                return "Threshold updated successfully";
            }
            else
            {
                return "Device not found for the user";
            }
        }
        catch (Exception e)
        {
            return "Failed to update threshold";
        }
    }
    
    public void deleteAll()
    {
        deviceRepository.deleteAll();
    }

    @Transactional
    public List<Device> getDeviceBySchedule(long schedule_id){
        return deviceRepository.findBySchedule_id(schedule_id);
    };

    public Schedule getScheduleByDevice(long id, long user_id)
    {
        return deviceRepository.findByIdAndUser_id(id, user_id).getSchedule();
    };
}
