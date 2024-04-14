package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Record.Record;
import com.tvtak.tvtak.repository.RecordRepository;

import java.util.*;

@Service
public class RecordService 
{
    @Autowired
    private RecordRepository repository;

    public void save(Record record)
    {
        repository.save(record);
    }

    public List<Record> getAllRecords()
    {
        List<Record> records = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(records::add);
        return records;
    }

    public void delete(Record record)
    {
        repository.delete(record);
    }
}
