package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Record.FeedData;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
}
