package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Note.Note;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.repository.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.*;

@Service
public class NoteService 
{
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Object createNewNote(Note note, long user_id)
    {
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            if (!em.contains(user))
                em.merge(user);

            note.setUser(user);
        }
        
        return noteRepository.save(note).getId();
    }

    @Transactional
    public boolean editNote(Note note, long user_id, long note_id)
    {
        Note currNote = noteRepository.findByIdAndUser_id(note_id, user_id);
        if (currNote != null)
        {
            if (!em.contains(currNote))
                em.merge(currNote);
            
            currNote.assignNew(note);
            return true;
        }
        return false;
    }

    public List<Note> getAllNotesByUser(long user_id)
    {
        return noteRepository.findAllByUser_id(user_id);
    }

    @Transactional
    public void deleteNote(long user_id, long note_id)
    {
        Note note = noteRepository.findByIdAndUser_id(note_id, user_id);
        
        if (note != null)
        {
            if (!em.contains(note))
                em.merge(note);

            noteRepository.delete(note);
        }
    }
}
