package com.parame.rnb.dto.request.recruiment;

import com.parame.rnb.api.StringToDateTimeAPI;
import com.parame.rnb.domain.recruit.Recruitment;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 구인 API - 등록 요청
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("[구인] 등록 요청")
public class RecruitmentSaveRequest {

    @ApiModelProperty(value = "유저 ID", example = "550e8400-e29b-41d4-a716-446655440000")
    private String userId;

    @ApiModelProperty(value = "제목", example = "스플랜더 질릴때 까지 하실 분 구해여~")
    private String title;

    @ApiModelProperty(value = "내용", example = "쌉고수만~")
    private String content;

    @ApiModelProperty(value = "최대인원수", example = "8")
    private Integer maxParticipant;

    @ApiModelProperty(value = "모임 날짜", example = "2021-09-27")
    private String date;

    @ApiModelProperty(value = "모임 장소", example = "서울특별시")
    private String place;

    @Builder
    public RecruitmentSaveRequest(String userId, String title, String content, Integer maxParticipant, String date, String place) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.maxParticipant = maxParticipant;
        this.date = date;
        this.place = place;
    }

    public Recruitment toEntity() {
        return Recruitment.builder()
                .userId(userId)
                .title(title)
                .content(content)
                .maxParticipant(maxParticipant)
                .date(StringToDateTimeAPI.stringToDateTime(date))
                .place(place)
                .nowParticipant(1)
                .complete(false)
                .build();
    }

}
