package com.tvtak.tvtak.model.Log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class LogDAO 
{
    @Autowired
    private LogRepository repository;

    public void save(Log log)
    {
        repository.save(log);
    }

    public List<Log> getAllLogs()
    {
        List<Log> logs = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(logs::add);
        return logs;
    }

    public void delete(Log log)
    {
        repository.delete(log);
    }
}
