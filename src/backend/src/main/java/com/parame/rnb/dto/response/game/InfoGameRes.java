package com.parame.rnb.dto.response.game;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.parame.rnb.domain.game.Game;

import com.parame.rnb.domain.game.Item;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class InfoGameRes {
	private Game game;
	private List<Item> shop;
	private List<GameResponse> similar;
}
