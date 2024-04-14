package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.repository.DeviceRepository;

import java.util.*;

@Service
public class DeviceService 
{
    @Autowired
    private DeviceRepository repository;

    public void save(Device device)
    {
        repository.save(device);
    }

    public List<Device> getAllDevices()
    {
        List<Device> devices = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(devices::add);
        return devices;
    }

    public void delete(Device device)
    {
        repository.delete(device);
    }

    public void deleteAll()
    {
        repository.deleteAll();
    }
}
