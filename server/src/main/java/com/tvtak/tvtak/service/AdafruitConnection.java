package com.tvtak.tvtak.service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tvtak.tvtak.model.Record.FeedData;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@Service
public class AdafruitConnection
{

    private final String AIO_USERNAME;
    private final String AIO_KEY;
    private final String BASE_URL;

    public AdafruitConnection() 
    {
        this.AIO_USERNAME = "DADN_CNPM_3";
        this.AIO_KEY = "aio_lCaK60OFwRJhKMC1laoTjfIk5OGJ";
        this.BASE_URL = "https://io.adafruit.com/api/v2/" + this.AIO_USERNAME + "/feeds/";
    }

    public void sendFeedData(String data, String feed_id) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            String url = this.BASE_URL + feed_id + "/data";

            // Set the headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-AIO-Key", this.AIO_KEY);

            // Create the JSON payload with the required field "value"
            String payload = "{\"value\": " + data + "}";

            HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                System.out.println("Data sent successfully to feed: " + feed_id);
            } else {
                System.out.println("Failed to send data to feed: " + feed_id);
            }
        } catch (Exception e) {
            System.out.println("Error sending data to feed: " + feed_id);
            e.printStackTrace();
        }
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
            return objectMapper.readValue(responseBody, new TypeReference<List<FeedData>>() {});

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
    public void deleteFeed(String feedName) {
        // Construct the URL for deleting the feed
        String deleteFeedUrl = this.BASE_URL + feedName;

        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AIO-Key", this.AIO_KEY);

        // Create the HTTP entity
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        // Make the DELETE request
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(deleteFeedUrl, HttpMethod.DELETE, requestEntity, String.class);
    }

    public FeedData getLastFeedData(String feedKey) {
        String lastDataUrl = this.BASE_URL + feedKey + "/data/last";

        RestTemplate restTemplate = new RestTemplate();

        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("X-AIO-Key", AIO_KEY);
            return execution.execute(request, body);
        });

        // Make the GET request to retrieve the last data point
        ResponseEntity<String> response = restTemplate.getForEntity(lastDataUrl, String.class);

        // Check if response is successful and contains data
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            try {
                // Parse the JSON response into a FeedData object
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readValue(response.getBody(), FeedData.class);
            } catch (IOException e) {
                return null;
            }
        } else {
            return null;
        }
    }
}
