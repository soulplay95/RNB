package com.parame.rnb.domain.recruit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.stream.Stream;

public interface RecruitmentRepository extends JpaRepository<Recruitment, Integer> {

    // [등록] 구인글 등록
    Recruitment save(Recruitment recruitment);

    // [조회 - 리스트] 지역명(모임 장소)으로 구인글 리스트 조회
    @Query("SELECT r FROM Recruitment r where r.place like %:place%")
    Stream<Recruitment> findAllByPlace(@Param("place") String place);

    // 유저 ID(호스트)로 조회
    Stream<Recruitment> findAllByUserId(String userId);

    // [조회] 구인글 ID로 상세 조회
    Optional<Recruitment> findByRecruitmentId(Integer recruitmentId);

    @Modifying
    @Query("UPDATE Recruitment r set r.nowParticipant = r.nowParticipant + 1 where r.recruitmentId = :recruitmentId")
    void plus(@Param("recruitmentId") Integer recruitmentId);

    @Modifying
    @Query("UPDATE Recruitment r set r.complete = 1 where r.recruitmentId = :recruitmentId")
    Integer update(@Param("recruitmentId") Integer recruitmentId);

    @Modifying
    @Query("UPDATE Recruitment r set r.nowParticipant = r.nowParticipant - 1 where r.recruitmentId = :recruitmentId")
    void kick(@Param("recruitmentId") Integer recruitmentId);

    @Override
    void deleteById(Integer recruitmentId);

}
