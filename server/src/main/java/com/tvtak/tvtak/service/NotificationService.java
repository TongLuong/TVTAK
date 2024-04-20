package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Notification.Notification;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.repository.*;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.*;

@Service
public class NotificationService 
{
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private NotificationRepository notiRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Object createNewNoti(Notification noti, long user_id)
    {
        Optional<User> userOptional = userRepository.findById(user_id);
        
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            
            if (!em.contains(user))
                em.merge(user);
            
            noti.setUser(user);
        }

        return notiRepository.save(noti).getId();
    }

    public List<Notification> getAllNotificationsByUser(long user_id)
    {
        return notiRepository.findAllByUser_id(user_id);
    }

    @Transactional
    public void deleteNoti(long user_id, long noti_id)
    {
        Notification noti = notiRepository.findByIdAndUser_id(noti_id, user_id);

        if (noti != null)
        {
            if (!em.contains(noti))
            em.merge(noti);
        
            notiRepository.delete(noti);
        }
    }
}
