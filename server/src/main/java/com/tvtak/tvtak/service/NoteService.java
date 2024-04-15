package com.tvtak.tvtak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tvtak.tvtak.model.Note.Note;
import com.tvtak.tvtak.model.User.User;
import com.tvtak.tvtak.repository.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class NoteService 
{
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public void createNewNote(Note note, long user_id)
    {
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isPresent())
            note.setUser(userOptional.get());
        try{
            System.out.println("yo "+note.getUser());
        noteRepository.save(note);}
        catch(Exception e)
        {
            System.out.println("yo "+e);
        }
    }

    public boolean editNote(Note note, long user_id, long note_id)
    {
        Optional<Note> noteOptional = noteRepository.findById(note_id);
        if (noteOptional.isPresent())
        {
            Note noteFound = noteOptional.get();
            if (noteFound.getUser().getId() == user_id)
            {
                noteFound.assignNew(note);
                noteRepository.save(noteFound);
                return true;
            }
        }
        return false;
    }

    public List<Note> getAllNotesByUser(long user_id)
    {
        return noteRepository.findAll()
                            .stream()
                            .filter(x -> x.getUser().getId() == user_id)
                            .collect(Collectors.toList());
    }

    public void deleteNote(long user_id, long note_id)
    {
        Note note = noteRepository.findByIdAndUser_id(user_id, note_id);

        if (note != null)
            noteRepository.delete(note);
    }
}
