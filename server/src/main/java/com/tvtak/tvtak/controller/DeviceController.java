package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Device.Device;
import com.tvtak.tvtak.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping("/add-device")
    public ResponseEntity<Object> newDevice(@RequestBody Device device, @RequestParam("user_id") Long user_id)
    {
        try
        {
            String response = this.deviceService.save(device, user_id, true);

            return new ResponseEntity<>(response, HttpStatus.OK);

        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
