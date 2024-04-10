package com.tvtak.tvtak.model;

import jakarta.persistence.*;
import java.util.*;

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

    @Column(name = "password", nullable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "device")
    private List<Log> logs;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sensor")
    private List<Record> sensor_records;

    public Device()
    {

    }

    public long getId()
    {
        return this.id;
    }

    public void setId(long id)
    {
        this.id = id;
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

    public void setName(boolean status)
    {
        this.status = status;
    }
}