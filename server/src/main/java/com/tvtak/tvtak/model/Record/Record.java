//package com.tvtak.tvtak.model.Record;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import com.tvtak.tvtak.model.Device.Device;
//
//@Entity
//public class Record
//{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "rid")
//    @Getter
//    private long rid;
//
//    @Column(name = "time")
//    @Setter @Getter
//    private String time;
//
//    @Column(name = "data")
//    @Setter @Getter
//    private String data;
//
//    @ManyToOne
//    @JoinColumn(name = "sensor_id")
//    private Device sensor;
//}