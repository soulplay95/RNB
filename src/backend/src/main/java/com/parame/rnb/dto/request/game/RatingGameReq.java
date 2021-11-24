package com.parame.rnb.dto.request.game;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class RatingGameReq {
	//보드게임 평점 작성하기
	private int gameId;
	private double rating;
}
