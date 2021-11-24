package com.parame.rnb.domain.recruit;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 구인글 entity
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "recruitment")
public class Recruitment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recruitmentId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "max_participant")
    private Integer maxParticipant;

    @Column(name = "now_participant")
    private Integer nowParticipant;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "place")
    private String place;

    @Column(name = "complete")
    private Boolean complete;

    @Builder
    public Recruitment(Integer recruitmentId, String userId, String title, String content, Integer maxParticipant, Integer nowParticipant, LocalDateTime date, String place, Boolean complete) {
        this.recruitmentId = recruitmentId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.maxParticipant = maxParticipant;
        this.nowParticipant = nowParticipant;
        this.date = date;
        this.place = place;
        this.complete = complete;
    }

}
