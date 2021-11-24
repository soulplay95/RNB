package com.parame.rnb.domain.player;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 플레이어 entity
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer playerId;

    @Column(name = "recruitment_id", nullable = false)
    private Integer recruitmentId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Builder
    public Player(Integer playerId, Integer recruitmentId, String userId) {
        this.playerId = playerId;
        this.recruitmentId = recruitmentId;
        this.userId = userId;
    }

}
