package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Notification.Notification;
import java.util.*;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>
{
    List<Notification> findAllByUser_id(long user_id);
    Notification findByIdAndUser_id(long id, long user_id);
}
