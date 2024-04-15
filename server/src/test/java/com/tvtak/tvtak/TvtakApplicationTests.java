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
		light.setStatus(false);
		light.setType("sensor");
		light.setUser(user);
		deviceService.save(light, user.getId(), false);

		Device temp = new Device();
		temp.setName("temp");
		temp.setStatus(false);
		temp.setType("sensor");
		temp.setUser(user);
		deviceService.save(temp, user.getId(), false);

		Device pump = new Device();
		pump.setName("pump");
		pump.setStatus(false);
		pump.setType("sensor");
		pump.setUser(user);
		deviceService.save(pump, user.getId(), false);
	}

	@Test
	void contextTests()
	{

	}
}
