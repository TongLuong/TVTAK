package com.tvtak.tvtak.model;

import java.io.Serializable;
import java.util.*;

public class NoteId implements Serializable
{
    private long id;
    private User user;

    public NoteId(long id, User user)
    {
        this.id = id;
        this.user = user;
    }

    public NoteId()
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
        
        NoteId other = (NoteId)o;
        return this.id == other.id 
                && this.user.equals(other.user);
    }

    @Override
    public int hashCode() 
    {
        return Objects.hash(this.id, this.user);
    }
}
