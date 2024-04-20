package com.tvtak.tvtak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@CrossOrigin
public class TvtakApplication 
{
	public static void main(String[] args) 
	{
		SpringApplication.run(TvtakApplication.class, args);
	}

	@GetMapping("/test")
    public ResponseEntity<Object> test()
    {
        return new ResponseEntity<>("testing", HttpStatus.OK);
    }
}

