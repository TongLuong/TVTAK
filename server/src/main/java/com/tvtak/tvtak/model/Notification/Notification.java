package com.tvtak.tvtak.model.Notification;

import com.tvtak.tvtak.model.User.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@IdClass(NotificationId.class)
public class Notification
{
    @Id
    @GeneratedValue
    @Column(name = "id")
    @Getter
    private long id;

    @Id
    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    @Setter @Getter
    private User user;

    @Column(name = "time")
    @Setter @Getter
    private String time; // dd-MM-YYYY

    @Column(name = "content")
    @Setter @Getter
    private String content;
}