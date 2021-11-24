package com.parame.rnb.dto.request.game;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class ReviewGameReq {
	//보드게임 리뷰 작성하기
	private int gameId;
	private String content;
}
