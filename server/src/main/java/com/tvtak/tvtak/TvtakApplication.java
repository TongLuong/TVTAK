package com.tvtak.tvtak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/v1")
public class TvtakApplication {
	public static void main(String[] args) {
		SpringApplication.run(TvtakApplication.class, args);
	}

	@GetMapping("/documentation")
	public String getAPIDoc()
	{
		return "";
	}
}
