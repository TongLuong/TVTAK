package com.tvtak.tvtak.model.Note;

import com.tvtak.tvtak.model.User.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@IdClass(NoteId.class)
public class Note
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    private long id;

    @Id
    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "content")
    @Setter @Getter
    private String content;
}