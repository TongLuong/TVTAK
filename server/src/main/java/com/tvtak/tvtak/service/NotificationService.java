package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Notification.Notification;
import com.tvtak.tvtak.repository.NotificationRepository;

import java.util.*;

@Service
public class NotificationService 
{
    @Autowired
    private NotificationRepository repository;

    public void save(Notification noti)
    {
        repository.save(noti);
    }

    public List<Notification> getAllNotifications()
    {
        List<Notification> notis = repository.findAll();
        return notis;
    }

    public void delete(Notification noti)
    {
        repository.delete(noti);
    }
}
