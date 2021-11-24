package com.parame.rnb.dto.request.player;

import com.parame.rnb.domain.player.Player;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 구인 API - 모임에서 나가기 요청
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("[구인] 모임에서 나가기 요청")
public class PlayerDeleteRequest {

    @ApiModelProperty(value = "구인글 ID", example = "1")
    private Integer recruitmentId;

    @ApiModelProperty(value = "유저 ID", example = "550e8400-e29b-41d4-a716-446655440000")
    private String userId;

    @Builder
    public PlayerDeleteRequest(Integer recruitmentId, String userId) {
        this.recruitmentId = recruitmentId;
        this.userId = userId;
    }

    public Player toEntity() {
        return Player.builder()
                .recruitmentId(recruitmentId)
                .userId(userId)
                .build();
    }

}
