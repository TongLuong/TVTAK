package com.tvtak.tvtak.model.Log;

import jakarta.persistence.*;
import lombok.*;

import com.tvtak.tvtak.model.Device.Device;

@Entity
public class Log
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    private long id;

    @Column(name = "time")
    @Setter @Getter
    private String time;

    @Column(name = "message")
    @Setter @Getter
    private String message;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;
}