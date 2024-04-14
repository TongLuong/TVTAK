package com.tvtak.tvtak.model.Record;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FeedData
{
    @JsonProperty("id")
    private String rid;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("expiration")
    private String expiration;

    @JsonProperty("value")
    private String data;

}