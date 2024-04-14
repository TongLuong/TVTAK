package com.tvtak.tvtak;

import com.tvtak.tvtak.service.AdafruitConnection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class TvtakApplication 
{
	public static void main(String[] args) 
	{
		SpringApplication.run(TvtakApplication.class, args);
	}
}

