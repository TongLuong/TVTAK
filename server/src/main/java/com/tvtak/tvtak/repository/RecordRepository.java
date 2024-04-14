package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Record.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long>
{
    
}
