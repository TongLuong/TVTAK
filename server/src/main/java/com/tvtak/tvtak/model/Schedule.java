package com.tvtak.tvtak.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Schedule
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "date", nullable = false)
    private String date; // dd-MM-YYYY

    @OneToMany(mappedBy = "schedule")
    private Set<Device> devices;

    public long getId()
    {
        return this.id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getType()
    {
        return this.type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getDate()
    {
        return this.date;
    }

    public void setDate(String date)
    {
        this.date = date;
    }
}