package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Notification.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>
{
    
}
