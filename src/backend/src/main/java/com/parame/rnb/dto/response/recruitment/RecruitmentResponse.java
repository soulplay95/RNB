package com.parame.rnb.dto.response.recruitment;

import com.parame.rnb.api.DateTimeToStringAPI;
import com.parame.rnb.domain.recruit.Recruitment;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 구인 API - 메인 응답
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("[구인] 메인 응답")
public class RecruitmentResponse {

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

    public RecruitmentResponse(Recruitment entity) {
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
