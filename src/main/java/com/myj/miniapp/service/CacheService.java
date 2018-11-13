package com.myj.miniapp.service;

import com.myj.miniapp.cache.CustomCache;

public interface CacheService {

    CustomCache put(String key, CustomCache value);

    CustomCache get(String key);
}
