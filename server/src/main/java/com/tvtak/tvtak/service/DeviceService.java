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

    public List<Device> getAllDevices(Long user_id)

    {

        return this.deviceRepository.findByUserId(user_id);

    }

    public String delete(Long device_id, Long user_id)
    {
        try {
            Optional<Device> deviceOptional = Optional.ofNullable(deviceRepository.findByIdAndUserId(device_id, user_id));
            if (deviceOptional.isPresent()) {
                Device device = deviceOptional.get();
                adafruitConnection.deleteFeed(device.getName());
                deviceRepository.delete(device);

                return "Delete success";
            } else {
                return "Device not found for the user";
            }

        } catch (Exception e) {
            return "Failed to delete";
        }
    }
    public String toggleStatus(Long device_id, Long user_id, int status) {
        try {
            Optional<Device> deviceOptional = Optional.ofNullable(deviceRepository.findByIdAndUserId(device_id, user_id));
            if (deviceOptional.isPresent()) {
                Device device = deviceOptional.get();
                String data = String.valueOf(status);
                adafruitConnection.sendFeedData(data, device.getSwitchName());

                device.setStatus(status);
                deviceRepository.save(device);

                return "Status updated successfully";
            } else {
                return "Device not found for the user";
            }
        } catch (Exception e) {
            return "Failed to update status";
        }
    }
    public void deleteAll()
    {
        deviceRepository.deleteAll();
    }
}
