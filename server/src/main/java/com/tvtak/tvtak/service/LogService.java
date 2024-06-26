package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Log.Log;
import com.tvtak.tvtak.repository.LogRepository;

import java.util.*;

@Service
public class LogService 
{
    @Autowired
    private LogRepository repository;

    public void save(Log log)
    {
        repository.save(log);
    }

    public List<Log> getAllLogs()
    {
        List<Log> logs = repository.findAll();
        return logs;
    }

    public void delete(Log log)
    {
        repository.delete(log);
    }
}
