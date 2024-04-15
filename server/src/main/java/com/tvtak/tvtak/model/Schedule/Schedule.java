package com.tvtak.tvtak.model.Schedule;

import jakarta.persistence.*;

import com.tvtak.tvtak.model.User.User;

import lombok.*;

@Entity
public class Schedule
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    private long id;

    @Column(name = "type", nullable = false)
    @Setter @Getter
    private String type;

    @Column(name = "date", nullable = false)
    @Setter @Getter
    private String date; // dd-MM-YYYY

    @Column(name = "start_time", nullable = false)
    @Setter @Getter
    private String start_time; // HH:mm:ss

    @Column(name = "end_time", nullable = false)
    @Setter @Getter
    private String end_time; // HH:mm:ss

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Setter @Getter
    private User user;

    public void assignNew(Schedule newSched)
    {
        this.type = newSched.type;
        this.date = newSched.date;
        this.start_time = newSched.start_time;
        this.end_time = newSched.end_time;
    }
}