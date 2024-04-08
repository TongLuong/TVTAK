package com.tvtak.tvtak.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController
{
    @PostMapping("/api/user/create-new-user")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name)
	{
      	return String.format("Hello %s!", name);
    }

    @GetMapping("/api/user/get-all-user")
    public String hello()
	{
      	return "";
    }
}
