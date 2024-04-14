package com.tvtak.tvtak.model.Device;

import jakarta.persistence.*;
import java.util.*;
import lombok.*;

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
    @Getter
    private long id;

    @Column(name = "name")
    @Setter @Getter
    private String name;

    @Column(name = "status")
    @Setter @Getter
    private boolean status; // 0: off, 1: on

    @Column(name = "type", nullable = false)
    @Setter @Getter
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
}