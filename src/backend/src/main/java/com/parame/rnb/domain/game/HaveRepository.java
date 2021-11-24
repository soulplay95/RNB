package com.parame.rnb.domain.game;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.parame.rnb.domain.game.Have;

public interface HaveRepository extends JpaRepository<Have, Integer>{

	//가지고 있는 게임 삭제하기
	void deleteByUserIdAndGameId(String userId, int gameId);

	//가지고 있는 게임 목록
	@Query(value = "SELECT game_id FROM have WHERE user_id = :userId", nativeQuery = true)
	List<Integer> findGameIdByUserId(String userId);

	Optional<Have> findByUserIdAndGameId(String userId, int gameId);

}
