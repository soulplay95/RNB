package com.parame.rnb.dto.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("[게임] 상세 검색 요청")
public class GameDetailSearchRequest {

    @ApiModelProperty(value = "인원 수", example = "3")
    private Integer people;

    @ApiModelProperty(value = "시간(분)", example = "30")
    private Integer time;

    @ApiModelProperty(value = "장르", example = "장르1|장르2|장르3")
    private String genre;

    
    @Builder
    public GameDetailSearchRequest(Integer people, Integer time, String genre) {
        this.people = people;
        this.time = time;
        this.genre = genre;
    }

}
