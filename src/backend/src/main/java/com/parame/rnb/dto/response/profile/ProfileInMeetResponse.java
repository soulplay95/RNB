package com.parame.rnb.dto.response.profile;

import com.parame.rnb.dto.response.game.HaveListGameRes;
import com.parame.rnb.dto.response.game.UserSimRes;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 모임 내 다른 사용자의 정보 상세보기 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("[구인] 모임 내 다른 사용자의 정보 상세보기 응답")
public class ProfileInMeetResponse {

    @ApiModelProperty(value = "유저 ID", example = "UUID")
    private String userId;

    @ApiModelProperty(value = "프로필 사진", example = "이미지 url")
    private String profileImg;

    @ApiModelProperty(value = "닉네임", example = "젠가맨")
    private String nickname;

    @ApiModelProperty(value = "인기도", example = "10")
    private Integer popularity;

    @ApiModelProperty(value = "유사도", example = "20.8")
    private UserSimRes similarity;

    @ApiModelProperty(value = "소유중인 게임 리스트", example = "게임")
    private HaveListGameRes haveList;

    public ProfileInMeetResponse(String userId, String profileImg, String nickname, Integer popularity, UserSimRes similarity, HaveListGameRes haveList) {
        this.userId = userId;
        this.profileImg = profileImg;
        this.nickname = nickname;
        this.popularity = popularity;
        this.similarity = similarity;
        this.haveList = haveList;
    }

}
