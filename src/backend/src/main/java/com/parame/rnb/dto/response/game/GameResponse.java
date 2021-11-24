package com.parame.rnb.dto.response.game;

import com.parame.rnb.domain.game.Game;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("[게임] 메인 응답")
public class GameResponse {

    private int id;

    private int originalId;

    private String name;
    private String info;

    private int minPeople;
    private int maxPeople;

    private int minTime;
    private int maxTime;

    private String genre;
    private String image;
    private String youtube;
    private int level;

    public GameResponse(Game entity) {
        this.id = entity.getId();
        this.originalId = entity.getOriginalId();
        this.name = entity.getName();
        this.info = entity.getInfo();
        this.minPeople = entity.getMinPeople();
        this.maxPeople = entity.getMaxPeople();
        this.minTime = entity.getMinTime();
        this.maxTime = entity.getMaxTime();
        this.genre = entity.getGenre();
        this.image = entity.getImage();
        this.youtube = entity.getYoutube();
        this.level = entity.getLevel();
    }

}
