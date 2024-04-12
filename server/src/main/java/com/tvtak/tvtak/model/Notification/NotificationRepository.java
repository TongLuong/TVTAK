package com.tvtak.tvtak.model.Notification;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Integer>
{
    
}
