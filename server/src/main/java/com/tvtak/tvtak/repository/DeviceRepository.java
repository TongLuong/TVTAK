package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Device.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long>
{
    
}
