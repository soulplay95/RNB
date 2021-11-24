package com.parame.rnb.dto.request.game;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class HaveGameReq {
	//보드게임 소유
	private int gameId;
}
