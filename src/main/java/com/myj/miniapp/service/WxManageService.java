package com.myj.miniapp.service;

import java.util.Map;

public interface WxManageService {
    Map<String, Object> getWxSession(String wxCode);

    String createThirdSession(String wxOpenId, String wxSessionKey, Long expires);
}
