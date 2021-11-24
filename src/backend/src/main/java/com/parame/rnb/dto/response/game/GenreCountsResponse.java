package com.parame.rnb.dto.response.game;

import com.parame.rnb.domain.game.GenreCounts;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("[게임] 장르 메인 응답")
public class GenreCountsResponse {

    @ApiModelProperty(value = "장르", example = "Adventure")
    private String genre;

    @ApiModelProperty(value = "개수", example = "1222")
    private Integer counts;

    public GenreCountsResponse(GenreCounts entity) {
        genre = entity.getGenre();
        counts = entity.getCounts();
    }

}
