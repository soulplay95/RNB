package com.parame.rnb.dto.request.game;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class LikeGameReq {
	//보드게임 찜하기
	private int gameId;
}
