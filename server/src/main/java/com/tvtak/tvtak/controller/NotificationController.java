package com.tvtak.tvtak.controller;

import com.tvtak.tvtak.model.Notification.Notification;
import com.tvtak.tvtak.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/notification")
public class NotificationController
{
    @Autowired
    private NotificationService notiService;

    @PostMapping("/create-notification")
    public ResponseEntity<Object> newNoti(
        @RequestBody Notification note,
        @RequestParam long user_id)
    {
        try
        {
            Object res = this.notiService.createNewNoti(note, user_id);

            return new ResponseEntity<>(res, HttpStatus.OK);

        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all-notifications")
    public ResponseEntity<List<Notification>> getAllNotesByUser(
        @RequestParam long user_id)
    {
        try
        {
            List<Notification> res = this.notiService.getAllNotificationsByUser(user_id);

            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-notification")
    public ResponseEntity<List<Notification>> deleteNote(
        @RequestParam long user_id,
        @RequestParam long notification_id)
    {
        try
        {
            this.notiService.deleteNoti(user_id, notification_id);

            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
