package com.parame.rnb.service;

import com.parame.rnb.domain.game.Game;
import com.parame.rnb.domain.game.Review;
import com.parame.rnb.dto.request.game.*;
import com.parame.rnb.dto.response.game.*;

import java.util.List;

public interface GameService {

	// 전체 목록 조회
	List<Game> findAll();

	// 게임 이름으로 검색
	List<GameResponse> findAllByName(String name);

	// 장르 조회
	List<GenreCountsResponse> getGenreList();

	// 상세 검색
	List<GameResponse> detailSearch(GameDetailSearchRequest request);


	//찜하기
	String likeGame(String userId, LikeGameReq likeBoardReq);
	//찜해제하기
	String unlikeGame(String userId, LikeGameReq likeBoardReq);
	//찜목록
	LikeListGameRes likeListGame(String userId);

	//가지고 있는 게임 추가
	String addGame(String userId, HaveGameReq haveBoardReq);
	//가지고 있는 게임 삭제
	String removeGame(String userId, HaveGameReq haveBoardReq);
	//가지고 있는 게임 목록
	HaveListGameRes haveListGame(String userId);

	//리뷰 작성하기
	String reviewGame(String userId, ReviewGameReq reviewBoardReq);
	//리뷰 보기
	List<Review> myReview(String userId);
	//평점 작성하기
	String ratingGame(String userId, RatingGameReq ratingBoardReq);
	//난이도 평가하기
	String levelGame(String userId, LevelGameReq levelBoardReq);

	//보드게임 상세정보
	InfoGameRes infoGame(String userId, int boardId);

	void saveRecentReadGames(String userId, int gameId);
	List<GameResponse> findRecent(String userId);

	// 개인화 추천
	List<GameResponse> personalRecommend(String userId);

	// 평점순 추천
	List<GameResponse> ratingRecommend();

	// 유저 유사도
	UserSimRes userSimilar(String userId1, String userId2);

	//소유 여부
	IsBooleanRes isHave(String userId, int gameId);

	//찜 여부
	IsBooleanRes isLike(String userId, int gameId);

	// 최신 발매 게임 30개 가져오기
	List<NewGameListResponse> getNewGames();

}
