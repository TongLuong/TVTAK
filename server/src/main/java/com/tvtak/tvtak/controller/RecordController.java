package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Record.FeedData;
import com.tvtak.tvtak.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;

import java.util.List;

@RestController
@RequestMapping("/api/record")
public class RecordController {
    @Autowired
    private RecordService recordService;

    @GetMapping("/get-data")
    public ResponseEntity<Object> getRecordDevice(@RequestParam("feed_id") String feed_id)
    {
        try {
            List<FeedData> feedData = recordService.getFeedData(feed_id);
            return new ResponseEntity<>(feedData, HttpStatus.OK);
        } catch (RestClientException e) {
            return new ResponseEntity<>("Error while fetching data from Adafruit API", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
