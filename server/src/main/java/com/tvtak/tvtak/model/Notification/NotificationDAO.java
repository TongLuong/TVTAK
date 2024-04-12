package com.tvtak.tvtak.model.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class NotificationDAO 
{
    @Autowired
    private NotificationRepository repository;

    public void save(Notification noti)
    {
        repository.save(noti);
    }

    public List<Notification> getAllNotifications()
    {
        List<Notification> notis = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(notis::add);
        return notis;
    }

    public void delete(Notification noti)
    {
        repository.delete(noti);
    }
}
