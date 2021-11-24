package com.parame.rnb.domain.game;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parame.rnb.domain.game.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

	Optional<Review> getByUserIdAndGameId(String userId, int gameId);
	List<Review> getAllByUserId(String userId);


}
