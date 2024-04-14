package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Record.FeedData;


import java.util.*;

@Service
public class RecordService 
{

    @Autowired
    private AdafruitConnection adafruitConnection;



    public List<FeedData> getFeedData(String feed_id) {
        return adafruitConnection.getFeedData(feed_id);
    }


}
