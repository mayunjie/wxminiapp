package com.myj.miniapp.service;

import com.myj.miniapp.entity.Session;

public interface SessionService {
    Session getSession(String token);

    void setSession(String token, String sessionKey, String openId);

    boolean checkSession(String token);

    String createThirdSession(String sessionKey, String openId);
}
