package com.tvtak.tvtak.model.Note;

import com.tvtak.tvtak.model.User.User;

import jakarta.persistence.*;

@Entity
@IdClass(NoteId.class)
public class Note
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Id
    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "content")
    private String content;

    public long getId()
    {
        return this.id;
    }

    public String getContent()
    {
        return this.content;
    }

    public void setContent(String cnt)
    {
        this.content = cnt;
    }
}