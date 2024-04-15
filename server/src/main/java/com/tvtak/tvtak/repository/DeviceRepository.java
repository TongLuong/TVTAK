package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Device.Device;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long>
{
    Device findByName(String name);
    Device findByIdAndUserId(Long id, Long user_id);

    List<Device> findByUserId(Long userId);
}
