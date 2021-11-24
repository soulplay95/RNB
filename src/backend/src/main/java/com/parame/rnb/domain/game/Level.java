package com.parame.rnb.domain.game;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Getter
@Setter
@ToString
@Table(name = "level")
public class Level {
	
	@Id
	@Column(name = "level_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int levelId;
	
	@Column(name = "user_id")
	private String userId;
	@Column(name = "game_id")
	private int gameId;
	
	private int difficulty;
}
