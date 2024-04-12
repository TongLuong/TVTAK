package com.tvtak.tvtak.model.Log;

import jakarta.persistence.*;

import com.tvtak.tvtak.model.Device.Device;

@Entity
public class Log
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "time")
    private String time;

    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    public long getId()
    {
        return this.id;
    }

    public String getTime()
    {
        return this.time;
    }

    public void setId(String time)
    {
        this.time = time;
    }

    public String getMessage()
    {
        return this.time;
    }

    public void setMessage(String msg)
    {
        this.message = msg;
    }
}