package com.parame.rnb.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("tempUser")
public class TempUser {
    @Id
    private String email;
    private String token;
    private boolean isCheck;

    @TimeToLive(unit = TimeUnit.MINUTES)
    private int timeToLive;
}
