package com.tvtak.tvtak.model;

import jakarta.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private Device device;

    public long getId()
    {
        return this.id;
    }

    public void setId(long id)
    {
        this.id = id;
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