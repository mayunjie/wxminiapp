package com.myj.miniapp.service.impl;

import com.alibaba.fastjson.JSON;
import com.myj.miniapp.cache.CustomCache;
import com.myj.miniapp.service.CacheService;
import com.myj.miniapp.service.WxManageService;
import com.myj.miniapp.util.HttpUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class WxManageServiceImpl implements WxManageService{

    @Value("${wx.auth.appId}")
    private String appId;

    @Value("${wx.auth.secret}")
    private String appSecret;

    @Value("${wx.auth.grantType}")
    private String grantType;

    @Value("${wx.auth.sessionHost}")
    private String sessionHost;

    @Autowired
    private CacheService cacheService;
    @Override
    public Map<String, Object> getWxSession(String wxCode) {
        StringBuffer sb = new StringBuffer();
        sb.append("appid=").append(appId);
        sb.append("&secret=").append(appSecret);
        sb.append("&js_code=").append(wxCode);
        sb.append("&grant_type=").append(grantType);
        System.out.println(sb.toString());
        String res = HttpUtils.sendGet(sessionHost, sb.toString());
        if(StringUtils.isEmpty(res)){
            return null;
        }
        return JSON.parseObject(res, Map.class);
    }

    @Override
    public String createThirdSession(String wxOpenId, String wxSessionKey, Long expires) {
        String thirdSessionKey = RandomStringUtils.randomAlphanumeric(64);
        StringBuffer sb = new StringBuffer();
        sb.append(wxSessionKey).append("#").append(wxOpenId);
        CustomCache<String> cache = new CustomCache(thirdSessionKey, sb.toString(), expires);
        cacheService.put(thirdSessionKey, cache);
        return thirdSessionKey;
    }
}
