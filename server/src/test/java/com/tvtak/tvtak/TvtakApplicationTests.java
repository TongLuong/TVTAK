package com.tvtak.tvtak;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tvtak.tvtak.model.Device.*;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.service.DeviceService;
import com.tvtak.tvtak.service.UserService;

@SpringBootTest
class TvtakApplicationTests 
{
	@Autowired
	private DeviceService deviceService;

	@Autowired
	private UserService userService;

	@Test
	void contextLoads()
	{
		// add data
		User user = new User();
		user.setEmail("hiwib65173@etopys.com");
		user.setUsername("DADN_CNPM_3");
		user.setPassword("tvtak3_dadn_cnpm");
		user.setBio("");
		user.setAddress("Ho Chi Minh City");
		user.setPhone("0123456789");
		userService.registerAccount(user);

		Device light = new Device();
		light.setName("light");
		light.setStatus(0);
		light.setType("sensor");
		light.setUser(user);
		light.setSwitch_name("manual-light");
		light.setThreshold(1000.0);
		deviceService.save(light, user.getId(), false);

		Device temp = new Device();
		temp.setName("temp");
		temp.setStatus(0);
		temp.setType("sensor");
		temp.setUser(user);
		temp.setSwitch_name("manual-temp");
		temp.setThreshold(1000.0);
		deviceService.save(temp, user.getId(), false);

		Device pump = new Device();
		pump.setName("pump");
		pump.setStatus(0);
		pump.setType("sensor");
		pump.setUser(user);
		pump.setSwitch_name("manual-pump");
		deviceService.save(pump, user.getId(), false);
	}

	@Test
	void contextTests()
	{

	}
}
