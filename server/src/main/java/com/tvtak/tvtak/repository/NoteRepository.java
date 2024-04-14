package com.tvtak.tvtak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tvtak.tvtak.model.Note.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>
{
    
}
