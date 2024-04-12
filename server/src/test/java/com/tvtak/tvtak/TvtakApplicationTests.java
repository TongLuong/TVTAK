package com.tvtak.tvtak;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tvtak.tvtak.model.Device.*;

@SpringBootTest
class TvtakApplicationTests 
{
	@Autowired
	private DeviceDAO deviceDao;

	@Test
	void contextLoads()
	{
		Device device = new Device();
		device.setName("iot-light");
		device.setStatus(false);
		device.setType("sensor");
		deviceDao.save(device);

		Device device2 = new Device();
		device2.setName("iot-humid");
		device2.setStatus(false);
		device2.setType("sensor");
		deviceDao.save(device2);
		deviceDao.delete(device);
	}

	@Test
	void contextDeletes()
	{
		deviceDao.deleteAll();
	}
}
