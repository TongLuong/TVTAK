package com.tvtak.tvtak.model.Record;

import jakarta.persistence.*;

import com.tvtak.tvtak.model.Device.Device;

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

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Device sensor;

    public long getId()
    {
        return this.rid;
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