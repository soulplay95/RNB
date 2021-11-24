package com.parame.rnb.dto.response.recruitment;

import com.parame.rnb.api.DateTimeToStringAPI;
import com.parame.rnb.domain.player.Player;
import com.parame.rnb.domain.recruit.Recruitment;
import com.parame.rnb.dto.response.player.PlayerResponse;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 구인 API - 모임 상세보기 응답
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("[구인] 모임 상세보기 응답")
public class RecruitmentDetailResponse {

    @ApiModelProperty(value = "구인글 ID", example = "1")
    private Integer recruitmentId;

    @ApiModelProperty(value = "유저 ID", example = "UUID")
    private String userId;

    @ApiModelProperty(value = "제목", example = "제목")
    private String title;

    @ApiModelProperty(value = "내용", example = "내용")
    private String content;

    @ApiModelProperty(value = "최대인원수", example = "8")
    private Integer maxParticipant;

    @ApiModelProperty(value = "현재인원수", example = "1")
    private Integer nowParticipant;

    @ApiModelProperty(value = "모임 날짜", example = "2021-03-12")
    private String date;

    @ApiModelProperty(value = "모임 장소", example = "서울특별시")
    private String place;

    @ApiModelProperty(value = "모집 완료 여부", example = "0")
    private Boolean complete;

    @ApiModelProperty(value = "참가자 ID 리스트", example = "UUID1, UUID2, ..")
    private List<PlayerResponse> participants;

    public RecruitmentDetailResponse(Recruitment entity) {
        this.recruitmentId = entity.getRecruitmentId();
        this.userId = entity.getUserId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.maxParticipant = entity.getMaxParticipant();
        this.nowParticipant = entity.getNowParticipant();
        this.date = DateTimeToStringAPI.dateTimeToString(entity.getDate());
        this.place = entity.getPlace();
        this.complete = entity.getComplete();
    }

}
