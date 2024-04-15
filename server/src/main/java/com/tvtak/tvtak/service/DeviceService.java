package com.tvtak.tvtak.service;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.repository.DeviceRepository;

import java.util.*;

@Service
public class DeviceService 
{
    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdafruitConnection adafruitConnection;

    public String save(Device device, long id, boolean createNewFeed)
    {
        if (isExist(device.getName()))
        {
            return "device is exist";
        }

        if (createNewFeed)
            this.adafruitConnection.createFeed(device.getName());

        //find user by id
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            device.setUser(user);
        }

        this.deviceRepository.save(device);
        return "add device success";
    }

    public boolean isExist(String name)
    {

        return this.deviceRepository.findByName(name) != null;
    }

    public List<Device> getAllDevices()
    {
        List<Device> devices = deviceRepository.findAll();
        return devices;
    }

    public void delete(Device device)
    {
        deviceRepository.delete(device);
    }

    public void deleteAll()
    {
        deviceRepository.deleteAll();
    }
}
