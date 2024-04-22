package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/device")
public class DeviceController 
{
    @Autowired
    private DeviceService deviceService;

    @PostMapping("/add-device")
    public ResponseEntity<Object> newDevice(
        @RequestBody Device device,
        @RequestParam("user_id") Long user_id)
    {
        try
        {
            Object response = this.deviceService.save(device, user_id, true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-device")
    public ResponseEntity<Object> delDevice(
        @RequestParam("device_id") Long device_id,
        @RequestParam("user_id") Long user_id)
    {
        try
        {
            String response = this.deviceService.delete(device_id, user_id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all-devices")
    public ResponseEntity<Object> getAllDevice(
        @RequestParam("user_id") Long user_id)
    {
        try
        {
            List<Device> devices = this.deviceService.getAllDevices(user_id);
            
            return new ResponseEntity<>(devices, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/toggle-device")
    public ResponseEntity<Object> toggleDevice(
            @RequestParam int status,
            @RequestParam("device_id") Long device_id,
            @RequestParam("user_id") Long user_id)
    {
        try
        {
            String response = this.deviceService.toggleStatus(device_id, user_id,status);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
