package com.tvtak.tvtak.model.User;

import jakarta.persistence.*;
import java.util.*;

import com.tvtak.tvtak.model.Note.Note;
import com.tvtak.tvtak.model.Notification.Notification;
import com.tvtak.tvtak.model.Schedule.Schedule;
import lombok.Getter;
import lombok.Setter;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Setter @Getter
    private long id;

    @Column(name = "email", nullable = false, unique = true)
    @Setter @Getter
    private String email;

    @Column(name = "username", nullable = false, unique = true)
    @Setter @Getter
    private String username;

    @Column(name = "password")
    @Setter @Getter
    private String password;

    @Column(name = "phone")
    @Setter @Getter
    private String phone;

    @Column(name = "address")
    @Setter @Getter
    private String address;

    @Column(name = "bio")
    @Setter @Getter
    private String bio;

    @OneToMany(mappedBy = "user")
    private Set<Note> notes;

    @OneToMany(mappedBy = "user")
    private Set<Notification> notifications;

    @OneToMany(mappedBy = "user")
    private Set<Schedule> schedules;

    @OneToMany(mappedBy = "user")
    private Set<Schedule> devices;

    public User()
    {

    }



    public String getNAttribute(int n)
    {
        switch (n) 
        {
            case 0:
                return Long.toString(this.id);
            case 1:
                return this.email;
            case 2:
                return this.username;
            case 3:
                return this.password;
            case 4:
                return this.phone;
            case 5:
                return this.address;
            case 6:
                return this.bio;
            default:
                throw new IllegalArgumentException();
        }
    }

    public void setNAttribute(int n, String newVal)
    {
        switch (n) 
        {
            case 0:
                this.id = Long.parseLong(newVal);
                break;
            case 1:
                this.email = newVal;
                break;
            case 2:
                this.username = newVal;
                break;
            case 3:
                this.password = newVal;
                break;
            case 4:
                this.phone = newVal;
                break;
            case 5:
                this.address = newVal;
                break;
            case 6:
                this.bio = newVal;
                break;
            default:
                throw new IllegalArgumentException();
        }
    }
}