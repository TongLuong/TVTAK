package com.tvtak.tvtak.model.Note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class NoteDAO 
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
