package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Note.Note;
import com.tvtak.tvtak.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/note")
public class NoteController
{
    @Autowired
    private NoteService noteService;

    @PostMapping("/create-new-note")
    public ResponseEntity<Object> newNote(
        @RequestBody Note note,
        @RequestParam long user_id)
    {
        try
        {
            this.noteService.createNewNote(note, user_id);

            return new ResponseEntity<>(null, HttpStatus.OK);

        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/edit-note")
    public ResponseEntity<Object> editNote(
        @RequestBody Note note,
        @RequestParam long user_id,
        @RequestParam long note_id)
    {
        try
        {
            if (!this.noteService.editNote(note, user_id, note_id))
                return new ResponseEntity<>("note not found", HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(null, HttpStatus.OK);

        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all-note")
    public ResponseEntity<List<Note>> getAllNotesByUser(
        @RequestParam long user_id)
    {
        try
        {
            List<Note> res = this.noteService.getAllNotesByUser(user_id);

            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-note")
    public ResponseEntity<List<Note>> deleteNote(
        @RequestParam long user_id,
        @RequestParam long note_id)
    {
        try
        {
            this.noteService.deleteNote(user_id, note_id);

            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
