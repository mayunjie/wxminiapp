package com.myj.miniapp.cache;

import lombok.Data;

import java.util.Date;

@Data
public class CustomCache<T> {
    private String key;

    private T data;

    private Long expires;

    private Date endDate;

    public CustomCache(String key, T data, Long expires){
        this.key = key;
        this.data = data;
        this.expires = expires;
        this.endDate = new Date(System.currentTimeMillis() + expires);
    }
}
