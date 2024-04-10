package com.tvtak.tvtak.model;

import jakarta.persistence.*;

@Entity
public class Notification
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Id
    @Column(name = "user_id")
    private long user_id;

    @Column(name = "time")
    private String time;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

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

    public String getContent()
    {
        return this.content;
    }

    public void setContent(String cnt)
    {
        this.content = cnt;
    }
}