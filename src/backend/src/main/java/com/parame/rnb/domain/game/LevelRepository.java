package com.parame.rnb.domain.game;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parame.rnb.domain.game.Level;

public interface LevelRepository extends JpaRepository<Level, Integer>{

	Optional<Level> findByUserIdAndGameId(String userId, int gameId);


}
