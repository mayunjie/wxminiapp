package com.myj.miniapp.service.impl;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.myj.miniapp.entity.Session;
import com.myj.miniapp.service.SessionService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.concurrent.TimeUnit;

@Service
public class SessionServiceImpl implements SessionService {

    private final static Cache<String, Session> cache = CacheBuilder.newBuilder()
            //设置cache的初始大小为10，要合理设置该值
            .initialCapacity(50)
            //设置并发数为5，即同一时间最多只能有5个线程往cache执行写入操作
            .concurrencyLevel(5)
            //设置cache中的数据在写入之后的存活时间为10秒
            .expireAfterAccess(3600, TimeUnit.SECONDS)
            //构建cache实例
            .build();

    @Override
    public Session getSession(String token){
        if(StringUtils.isEmpty(token)){
            return null;
        }
        return cache.getIfPresent(token);
    }

    @Override
    public void setSession(String token, String sessionKey, String openId){
        Session session = new Session(token, sessionKey, openId);
        cache.put(token, session);
    }

    @Override
    public boolean checkSession(String token){
        if(StringUtils.isEmpty(token)){
            return false;
        }
        return cache.getIfPresent(token) != null;
    }

    @Override
    public String createThirdSession(String sessionKey, String openId) {
        String token = RandomStringUtils.randomAlphanumeric(64);
        setSession(token, sessionKey, openId);
        return token;
    }
}
