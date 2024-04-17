package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Note.Note;
import java.util.*;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>
{
    Note findByIdAndUser_id(long id, long user_id);
    List<Note> findAllByUser_id(long user_id);
}
