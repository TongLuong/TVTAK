package com.tvtak.tvtak.model.Device;

import jakarta.persistence.*;
import lombok.*;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.Schedule.Schedule;

@Entity
public class Device
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    private long id;

    @Column(name = "name", unique = true, nullable = false)
    @Setter @Getter
    private String name;

    @Column(name = "switch_name", unique = true, nullable = false)
    @Setter @Getter
    private String switchName;

    @Column(name = "status")
    @Setter @Getter
    private int status; // 0: off, 1: on

    @Column(name = "type", nullable = false)
    @Setter @Getter
    private String type; // "sensor" or "mechanical"

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Setter @Getter
    private User user;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    @Setter @Getter
    private Schedule schedule;

}