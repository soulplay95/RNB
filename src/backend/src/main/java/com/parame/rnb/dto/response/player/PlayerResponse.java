package com.parame.rnb.dto.response.player;

import com.parame.rnb.api.DateTimeToStringAPI;
import com.parame.rnb.domain.player.Player;
import com.parame.rnb.domain.recruit.Recruitment;
import com.parame.rnb.domain.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 구인 API - 메인 응답
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("[구인] 메인 응답")
public class PlayerResponse {

    private Integer playerId;

    private Integer recruitmentId;

    private String userId;

    private String nickname;

    private String profileImg;

    public PlayerResponse(Player entity1, User entity2) {
        this.recruitmentId = entity1.getRecruitmentId();
        this.userId = entity1.getUserId();
        this.playerId = entity1.getPlayerId();
        this.nickname = entity2.getNickname();
        this.profileImg = entity2.getProfile_img();
    }

}
