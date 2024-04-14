package com.tvtak.tvtak.model.Schedule;

import jakarta.persistence.*;
import java.util.*;

import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.model.Device.Device;

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

    @OneToMany(mappedBy = "schedule")
    @Setter @Getter
    private Set<Device> devices;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Setter @Getter
    private User user;
}