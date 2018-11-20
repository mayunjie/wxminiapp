package com.myj.miniapp.entity;

import lombok.Data;

@Data
public class Session {

    private String token;

    private String sessionKey;

    private String openId;

    public Session(){}

    public Session(String token, String sessionKey, String openId){
        this.token = token;
        this.sessionKey = sessionKey;
        this.openId = openId;
    }
}
