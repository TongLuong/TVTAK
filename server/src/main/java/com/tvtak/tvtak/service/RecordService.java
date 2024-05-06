package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Record.FeedData;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecordService 
{
    @Autowired
    private AdafruitConnection adafruitConnection;

    public List<FeedData> getFeedData(String feed_id)
    {
        return adafruitConnection.getFeedData(feed_id);
    }

    public FeedData getFeedDataLast(String feed_id)
    {
       return adafruitConnection.getLastFeedData(feed_id);
    }

    public List<FeedData> getFeedDataByMonth(int month, int year, String feed_id)
    {
        List<FeedData> feedDataList = adafruitConnection.getFeedData(feed_id);
        List<FeedData> filteredData = new ArrayList<>();
        if (feedDataList == null){
            feedDataList = Collections.emptyList();
        }
        for (FeedData feedData : feedDataList)
        {
            LocalDateTime createdAtDateTime = LocalDateTime.parse(feedData.getCreatedAt(), DateTimeFormatter.ISO_DATE_TIME);
            int dataMonth = createdAtDateTime.getMonthValue();
            int dataYear = createdAtDateTime.getYear();

            if (dataMonth == month && dataYear == year)
                filteredData.add(feedData);
        }
        return filteredData;
    }
    public List<Map<String, Object>> getFeedDataAvgDayInDay(String feed_id){
        List<FeedData> feedDataList = adafruitConnection.getFeedData(feed_id);
        Map<LocalDate, Double> averageByDay = feedDataList.stream()
                .collect(Collectors.groupingBy(
                        data -> LocalDate.parse(data.getCreatedAt().substring(0, 10)),
                        Collectors.averagingDouble(data -> Double.parseDouble(data.getData()))
                ));
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        averageByDay.forEach((date, value) -> {
            Map<String, Object> entry = Map.of(
                    "date", date.format(formatter),
                    "value", value
            );
            result.add(entry);
        });
        return result;
    }
}
