package com.parame.rnb.domain.game;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "genre_counts")
public class GenreCounts {

    @Id
    private String genre;

    @Column(name = "counts")
    private Integer counts;

    @Builder
    public GenreCounts(String genre, Integer counts) {
        this.genre = genre;
        this.counts = counts;
    }

}
