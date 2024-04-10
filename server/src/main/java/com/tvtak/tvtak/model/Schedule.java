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

    @Id
    @Column(name = "user_id")
    private long user_id;

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "schedule")
    private List<Device> devices;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "date", nullable = false)
    private String date; // dd-MM-YYYY

    public long getId()
    {
        return this.id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public long getUserId()
    {
        return this.user_id;
    }

    public void setUserId(long user_id)
    {
        this.user_id = user_id;
    }

    public void setUser(User user)
    {
        this.user = user;
        this.user_id = user.getId();
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