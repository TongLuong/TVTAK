package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Record.FeedData;
import com.tvtak.tvtak.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;

import java.util.List;
import java.util.Map;

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
    @GetMapping("/get-data-last")
    public ResponseEntity<Object> getRecordDeviceLast(@RequestParam("feed_id") String feed_id)
    {
        try {
            FeedData lastData = recordService.getFeedDataLast(feed_id);

            if (lastData != null) return new ResponseEntity<>(lastData, HttpStatus.OK);

            return new ResponseEntity<>("No data available for the specified feed", HttpStatus.NOT_FOUND);
        } catch (RestClientException e) {
            return new ResponseEntity<>("Error while fetching data from Adafruit API", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-data-by")
    public ResponseEntity<Object> getRecordByMonth(
            @RequestParam("feed_id") String feed_id,
            @RequestParam("month") int month,
            @RequestParam("year") int year)
    {
        try {
            List<FeedData> filterData = recordService.getFeedDataByMonth(month, year, feed_id);

            return new ResponseEntity<>(filterData, HttpStatus.OK);

        } catch (RestClientException e) {
            return new ResponseEntity<>("Error while fetching data from Adafruit API", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-data-avg-each-day")
    public ResponseEntity<Object> getRecordAvgDate(
            @RequestParam("feed_id") String feed_id
    )
    {
        try {
            List<Map<String, Object>>  filterData = recordService.getFeedDataAvgDayInDay(feed_id);

            return new ResponseEntity<>(filterData, HttpStatus.OK);

        } catch (RestClientException e) {
            return new ResponseEntity<>("Error while fetching data from Adafruit API", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
