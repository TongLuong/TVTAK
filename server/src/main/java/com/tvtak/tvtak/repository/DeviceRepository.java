package com.tvtak.tvtak.repository;

import com.tvtak.tvtak.model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Device.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long>
{
    Device findByName(String name);
}
