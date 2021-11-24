package com.parame.rnb.dto.request.game;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class LevelGameReq {
	//보드게임 난이도 평가하기
	private int gameId;
	private int difficulty;
}
