package com.myj.miniapp.service.impl;

import com.myj.miniapp.cache.CustomCache;
import com.myj.miniapp.service.CacheService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CacheServiceImpl implements CacheService {

    private Map<String, CustomCache> cacheMap = new ConcurrentHashMap<String, CustomCache>();

    public CustomCache put(String key, CustomCache value){
        return cacheMap.put(key, value);
    }

    public CustomCache get(String key){
        return cacheMap.get(key);
    }
}
