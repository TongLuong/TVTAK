package main.java.com.tvtak.tvtak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainPage 
{
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name)
	{
      	return String.format("Hello %s!", name);
    }
}
