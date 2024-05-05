package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Device.Device;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long>
{
    Device findByName(String name);

    List<Device> findBySchedule_id(long schedule_id);

    Device findByIdAndUserId(long id, long user_id);

    List<Device> findByUserId(long userId);

    Device findByIdAndUser_id(long id, long user_id);
}
