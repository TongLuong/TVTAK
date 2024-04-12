package com.tvtak.tvtak.model.Device;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Integer>
{
    
}
