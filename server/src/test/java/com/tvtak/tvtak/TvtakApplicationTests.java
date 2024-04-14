package com.tvtak.tvtak;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

// import com.tvtak.tvtak.model.Device.*;
import com.tvtak.tvtak.model.User.User;
// import com.tvtak.tvtak.service.DeviceService;
import com.tvtak.tvtak.service.UserService;

@SpringBootTest
class TvtakApplicationTests 
{
	// @Autowired
	// private DeviceService deviceService;

	@Autowired
	private UserService userService;

	@Test
	void contextLoads()
	{
		User user = new User();
		user.setEmail("account@gmail.com");
		user.setUsername("account");
		user.setPassword("1234");
		user.setBio("helloworld");
		user.setAddress("sun");
		user.setPhone("012345678900");
		userService.registerAccount(user);
	}

	@Test
	void contextDeletes()
	{

	}
}
