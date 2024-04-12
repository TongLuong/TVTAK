package com.tvtak.tvtak.model.Note;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends CrudRepository<Note, Integer>
{
    
}
