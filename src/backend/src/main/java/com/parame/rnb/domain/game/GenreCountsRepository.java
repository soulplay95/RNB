package com.parame.rnb.domain.game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.stream.Stream;

public interface GenreCountsRepository extends JpaRepository<GenreCounts, String> {

    @Query("SELECT g FROM GenreCounts g order by g.counts DESC")
    Stream<GenreCounts> findAllGenre();

}
