package com.parame.rnb.domain.game;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.stream.Stream;

public interface GameRepository extends JpaRepository<Game, Integer>, GameRepositoryCustom {

    // 게임 이름으로 검색
    @Query("SELECT g FROM Game g WHERE g.name like %:name%")
    Stream<Game> findAllByName(@Param("name") String name);
    Game getByOriginalId(int originalId);
    Game getById(int id);

    // 최신 발매 게임 리스트 조회
    Stream<Game> findTop30ByOrderByPublishedYearDesc();

}
