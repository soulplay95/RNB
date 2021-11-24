package com.parame.rnb.dto.response.game;

import com.parame.rnb.domain.game.Game;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("[게임] 신작 게임 리스트 응답")
public class NewGameListResponse {

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
    private int publishedYear;

    public NewGameListResponse(Game entity) {
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
        this.publishedYear = entity.getPublishedYear();
    }

}
