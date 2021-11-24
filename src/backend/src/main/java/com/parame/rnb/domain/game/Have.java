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
@Table(name = "have")
public class Have {
	
	@Id
	@Column(name = "have_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int haveId;
	
	@Column(name = "user_id")
	private String userId;
	@Column(name = "game_id")
	private int gameId;
}
