package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Note.Note;
import com.tvtak.tvtak.repository.NoteRepository;

import java.util.*;

@Service
public class NoteService 
{
    @Autowired
    private NoteRepository repository;

    public void save(Note note)
    {
        repository.save(note);
    }

    public List<Note> getAllNotes()
    {
        List<Note> notes = new ArrayList<>();
        Streamable.of(repository.findAll())
                    .forEach(notes::add);
        return notes;
    }

    public void delete(Note note)
    {
        repository.delete(note);
    }
}
