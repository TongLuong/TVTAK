package com.tvtak.tvtak.model;

import jakarta.persistence.*;

@Entity
public class Record
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rid")
    private long rid;

    @Column(name = "time")
    private String time;

    @Column(name = "data")
    private String data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sensor_id")
    private Device sensor;

    public long getId()
    {
        return this.rid;
    }

    public void setId(long rid)
    {
        this.rid = rid;
    }

    public String getTime()
    {
        return this.time;
    }

    public void setTime(String time)
    {
        this.time = time;
    }

    public String getData()
    {
        return this.data;
    }

    public void setData(String data)
    {
        this.data = data;
    }
}