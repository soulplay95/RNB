package com.parame.rnb.domain.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.stream.Stream;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

    // [등록]
    Player save(Player player);

    // [삭제] By recruitmentId, userId
    @Modifying
    @Query("DELETE FROM Player p where p.recruitmentId = :recruitmentId AND p.userId = :userId")
    void deleteByRecruitmentIdAndUserIdAnd(@Param("recruitmentId") Integer recruitmentId, @Param("userId") String userId);

    // [조회] 리스트 By 구인글 ID
    Stream<Player> findAllByRecruitmentId(Integer recruitmentId);

    // [조회] 리스트 By 유저 ID
    Stream<Player> findAllByUserId(String userId);

}
