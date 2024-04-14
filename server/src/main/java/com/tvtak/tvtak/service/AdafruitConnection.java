package com.tvtak.tvtak.service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tvtak.tvtak.model.Record.FeedData;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AdafruitConnection
{

    private final String AIO_USERNAME;
    private final String AIO_KEY;
    private String BASE_URL;

    public AdafruitConnection() 
    {
        this.AIO_USERNAME = "DADN_CNPM_3";
        this.AIO_KEY = "aio_lCaK60OFwRJhKMC1laoTjfIk5OGJ";
        this.BASE_URL = "https://io.adafruit.com/api/v2/" + this.AIO_USERNAME + "/feeds/";
    }

    public void sendFeedData(String data, String feed_id) 
    {
        RestTemplate restTemplate = new RestTemplate();
        String url = this.BASE_URL + feed_id + "/data";
        restTemplate.postForObject(url, data, String.class);
    }

    public List<FeedData> getFeedData(String feed_id) 
    {
        String feedData_api = this.BASE_URL + feed_id + "/data";
        RestTemplate restTemplate = new RestTemplate();
        try 
        {
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(feedData_api, String.class);
            String responseBody = responseEntity.getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            List<FeedData> feedData = objectMapper.readValue(responseBody, new TypeReference<List<FeedData>>() {});

            return feedData;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public void createFeed(String feedName)
    {
        String requestBody = "{\"name\": \"" + feedName + "\"}";

        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-AIO-Key", this.AIO_KEY);

        // Create the HTTP entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make the POST request
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForLocation(this.BASE_URL, requestEntity);
    }
}
