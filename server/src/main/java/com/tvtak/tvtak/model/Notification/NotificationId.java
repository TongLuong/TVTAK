package com.tvtak.tvtak.model.Notification;

import java.io.Serializable;
import java.util.*;

import com.tvtak.tvtak.model.User.User;

public class NotificationId implements Serializable
{
    private long id;
    private User user;

    public NotificationId(long id, User user)
    {
        this.id = id;
        this.user = user;
    }

    public NotificationId()
    {
        this.id = -1;
        this.user = null;
    }

    @Override
    public boolean equals(Object o) 
    {
        if (this == o) 
            return true;
        if (o == null || this.getClass() != o.getClass()) 
            return false;
        
        NotificationId other = (NotificationId)o;
        return this.id == other.id 
                && this.user.equals(other.user);
    }

    @Override
    public int hashCode() 
    {
        return Objects.hash(this.id, this.user);
    }
}
