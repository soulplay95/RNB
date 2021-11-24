package com.parame.rnb.dto.response.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRes {

	private int gameId;
	private String name;
	private String content;
	private double rating;
	private String image;
}
