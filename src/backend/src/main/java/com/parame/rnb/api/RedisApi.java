package com.parame.rnb.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RedisApi {

    @Autowired
    private StringRedisTemplate redisTemplate;

    public String getData(String key) {
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        return vop.get(key);
    }

    public void setData(String key, String value, long expireTime) {
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        Duration expire = Duration.ofMillis(expireTime);
        vop.set(key, value, expire);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }
}
