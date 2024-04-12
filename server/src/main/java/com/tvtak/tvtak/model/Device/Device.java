package com.tvtak.tvtak.model.Device;

import jakarta.persistence.*;
import java.util.*;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.Schedule.Schedule;
import com.tvtak.tvtak.model.Log.Log;
import com.tvtak.tvtak.model.Record.Record;

@Entity
public class Device
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private boolean status; // 0: off, 1: on

    @Column(name = "type", nullable = false)
    private String type; // "sensor" or "mechanical"

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @OneToMany(mappedBy = "device")
    private Set<Log> logs;

    @OneToMany(mappedBy = "sensor")
    private Set<Record> records;

    public Device()
    {

    }

    public long getId()
    {
        return this.id;
    }

    public String getName()
    {
        return this.name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public boolean getStatus()
    {
        return this.status;
    }

    public void setStatus(boolean status)
    {
        this.status = status;
    }

    public String getType()
    {
        return this.type;
    }

    public void setType(String type)
    {
        if (type != "sensor" && type != "mechanical")
            throw new IllegalArgumentException();
        this.type = type;
    }
}