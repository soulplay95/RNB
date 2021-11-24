package com.parame.rnb.domain.game;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LikeRepository extends JpaRepository<Like, Integer>{

	void deleteByUserIdAndGameId(String userId, int gameId);

	@Query(value = "SELECT game_id FROM `like` WHERE user_id = :userId", nativeQuery = true)
	List<Integer> findGameIdByUserId(String userId);

	Optional<Like> findByUserIdAndGameId(String userId, int gameId);
}
