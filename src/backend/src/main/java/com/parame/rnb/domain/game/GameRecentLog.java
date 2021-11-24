package com.parame.rnb.domain.game;

import com.parame.rnb.dto.response.game.GameResponse;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

/**
 * 최근 상세보기한 게임 리스트 Redis Entity
 */
@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash("userId")
public class GameRecentLog {

    @Id
    private String userId;
    private GameResponse gameDto;

}
