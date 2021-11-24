package com.parame.rnb.dto.response.game;

import java.util.List;

import com.parame.rnb.domain.game.Game;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class HaveListGameRes {
	private List<Game> haveList;
}
