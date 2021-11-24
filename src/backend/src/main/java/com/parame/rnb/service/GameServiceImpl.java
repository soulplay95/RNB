package com.parame.rnb.service;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.google.api.client.googleapis.json.GoogleJsonError;
import com.parame.rnb.api.NaverApi;
import com.parame.rnb.api.RecommendApi;
import com.parame.rnb.api.RedisApi;
import com.parame.rnb.api.YoutubeApi;
import com.parame.rnb.config.RedisConfig;
import com.parame.rnb.domain.game.*;
import com.parame.rnb.dto.request.game.*;
import com.parame.rnb.dto.response.game.*;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class GameServiceImpl implements GameService {

	final private LikeRepository likeRepository;
	final private GameRepository gameRepository;
	final private HaveRepository haveRepository;
	final private ReviewRepository reviewRepository;
	final private LevelRepository levelRepository;
	private final GenreCountsRepository genreCountsRepository;
	final private YoutubeApi youtubeApi;
	final private NaverApi naverApi;
	final private RecommendApi recommendApi;
	private final RedisTemplate<String, GameResponse> redisTemplate;

	@Override
	public List<Game> findAll() {
		return gameRepository.findAll();
	}

	//찜하기
	@Override
	public String likeGame(String userId, LikeGameReq likeGameReq) {
		Like like = new Like();
		like.setUserId(userId);
		like.setGameId(likeGameReq.getGameId());
		likeRepository.save(like);
		return "OK";
	}

	//찜해제하기
	@Override
	public String unlikeGame(String userId, LikeGameReq likeGameReq) {
		likeRepository.deleteByUserIdAndGameId(userId, likeGameReq.getGameId());
		return "OK";
	}



	//가지고 있는 게임 추가
	@Override
	public String addGame(String userId, HaveGameReq haveGameReq) {
		Have have = new Have();
		have.setUserId(userId);
		have.setGameId(haveGameReq.getGameId());
		haveRepository.save(have);
		return "OK";
	}

	//가지고 있는 게임 삭제
	@Override
	public String removeGame(String userId, HaveGameReq haveGameReq) {
		haveRepository.deleteByUserIdAndGameId(userId, haveGameReq.getGameId());
		return "OK";
	}

	//찜목록
	@Override
	public LikeListGameRes likeListGame(String userId) {
		List<Integer> gameIds = likeRepository.findGameIdByUserId(userId);
		LikeListGameRes likeListGameRes = new LikeListGameRes();
		List<Game> list = new ArrayList<>();
		for(int i : gameIds) {
			Game game = gameRepository.getByOriginalId(i);
			list.add(game);
		}
		likeListGameRes.setLikeList(list);
		return likeListGameRes;
	}

	//가지고 있는 게임 목록
	@Override
	public HaveListGameRes haveListGame(String userId) {
		List<Integer> gameIds = haveRepository.findGameIdByUserId(userId);
		HaveListGameRes haveListGameRes = new HaveListGameRes();
		List<Game> list = new ArrayList<>();
		for(int i : gameIds) {
			Game game = gameRepository.getByOriginalId(i);
			list.add(game);
		}
		haveListGameRes.setHaveList(list);
		return haveListGameRes;
	}

	//리뷰 작성하기
	@Override
	public String reviewGame(String userId, ReviewGameReq reviewGameReq) {
		Optional<Review> review = reviewRepository.getByUserIdAndGameId(userId, reviewGameReq.getGameId());
		if(review.isPresent()) {
			review.get().setContent(reviewGameReq.getContent());
			reviewRepository.save(review.get());
			return "OK";
		}
		else return "평가 먼저 진행해주세요.";
	}

	@Override
	public List<Review> myReview(String userId) {
		return reviewRepository.getAllByUserId(userId);
	}

	//평점 작성하기
	@Override
	public String ratingGame(String userId, RatingGameReq ratingGameReq) {
		Review review = new Review();
		review.setUserId(userId);
		review.setGameId(ratingGameReq.getGameId());
		review.setRating(ratingGameReq.getRating());
		reviewRepository.save(review);
		return "OK";
	}

	//난이도 평가하기
	@Override
	public String levelGame(String userId, LevelGameReq levelGameReq) {
		Optional<Level> level = levelRepository.findByUserIdAndGameId(userId, levelGameReq.getGameId());
		//이전에 평가한 적 없는 경우
		if(!level.isPresent()) {
			level.get().setUserId(userId);
			level.get().setGameId(levelGameReq.getGameId());
		}
		level.get().setDifficulty(levelGameReq.getDifficulty());
		levelRepository.save(level.get());
		return "OK";
	}

	//보드게임 상세정보
	@Override
	public InfoGameRes infoGame(String userId, int gameId) {
		InfoGameRes infoGameRes = new InfoGameRes();
		Game game = gameRepository.getByOriginalId(gameId);
		if(game.getYoutube() == null) {
			game.setYoutube(youtubeApi.get(game.getName()));
			gameRepository.save(game);
		}
		String result = naverApi.search(game.getName()+" 보드게임");
		infoGameRes.setShop(naverApi.fromJSONtoItems(result));
		infoGameRes.setGame(game);
		List<Integer> list = recommendApi.getSimilar(gameId);
		List<GameResponse> games = new ArrayList<>();
		for(int boardId : list) {
			GameResponse gameRes = new GameResponse(gameRepository.getByOriginalId(boardId));
			games.add(gameRes);
		}
		infoGameRes.setSimilar(games);

		if (userId != null) { // 로그인한 사용자이면(토큰을 통해 유저 ID를 받아올 수 있는)
			// 최근 상세보기한 게임 목록에 캐싱
			saveRecentReadGames(userId, gameId);
		}

		return infoGameRes;
	}

	// 최근 상세보기한 게임 정보 저장
	public void saveRecentReadGames(String userId, int gameId){
		ListOperations<String, GameResponse> listOperations = redisTemplate.opsForList();
		Game game = gameRepository.getByOriginalId(gameId);
		GameResponse dto = new GameResponse(game);
		String key = "userId::" + userId;
		listOperations.leftPush(key, dto);
		redisTemplate.expireAt(key, Date.from(ZonedDateTime.now().plusDays(7).toInstant())); // 유효기간 TTL 일주일 설정
	}

	// 최근 상세보기한 게임 조회
	public List<GameResponse> findRecent(String userId) {
		ListOperations<String, GameResponse> listOperations = redisTemplate.opsForList();
		String key = "userId::" + userId;
		long size = listOperations.size(key) == null ? 0 : listOperations.size(key); // NPE 체크해야함.

		return listOperations.range(key, 0, size);
	}

	public List<GameResponse> findAllByName(String name) {
		return gameRepository.findAllByName(name)
				.map(GameResponse::new)
				.collect(Collectors.toList());
	}

	public List<GenreCountsResponse> getGenreList() {
		return genreCountsRepository.findAllGenre()
				.map(GenreCountsResponse::new)
				.collect(Collectors.toList());
	}

	public List<GameResponse> detailSearch(GameDetailSearchRequest request) {
		Integer people = request.getPeople();
		Integer time = request.getTime();
		String genre = request.getGenre();
		String regex = "\\|";
		String[] genres = genre.split(regex);

		return gameRepository.detailSearch(people, time, genres)
				.map(GameResponse::new)
				.collect(Collectors.toList());
	}

	// 개인화 추천
	@Override
	public List<GameResponse> personalRecommend(String userId) {
		List<Integer> like = new ArrayList<>();
		List<Integer> have = new ArrayList<>();
		List<Integer> allList = new ArrayList<>();
		try {
			like = likeRepository.findGameIdByUserId(userId);
		} catch(Exception e) {

		}
		try {
			have = haveRepository.findGameIdByUserId(userId);
		} catch (Exception e) {

		}
		if(like.size() != 0 && have.size() != 0) {
			allList.addAll(like);
			allList.addAll(have);
		} else if(like.size() != 0) {
			allList.addAll(like);
		} else if(have.size() != 0) {
			allList.addAll(have);
		}
		int size = allList.size();
		List<GameResponse> gameRes = new ArrayList<>();
		Random random = new Random();
		int gameId = 0;
		if(size == 0) {
			gameId = gameRepository.getById(random.nextInt(10000)).getOriginalId();
		} else {
			gameId = allList.get(random.nextInt(size));
		}
		List<Integer> list = recommendApi.recommend(gameId, userId);
		for(int boardId : list) {
			GameResponse gas = new GameResponse(gameRepository.getByOriginalId(boardId));
			gameRes.add(gas);
		}
		return gameRes;
	}

	@Override
	public List<GameResponse> ratingRecommend() {
		List<GameResponse> gameRes = new ArrayList<>();
		List<Integer> list = recommendApi.ratingRecommend();
		for(int boardId : list) {
			GameResponse gas = new GameResponse(gameRepository.getByOriginalId(boardId));
			gameRes.add(gas);
		}
		return gameRes;
	}

	// 유저 유사도
	@Override
	public UserSimRes userSimilar(String userId1, String userId2) {
		UserSimRes res = new UserSimRes();
		res.setUserSim(recommendApi.userSimilar(userId1,userId2));
		return res;
	}

	@Override
	public IsBooleanRes isHave(String userId, int gameId) {
		Optional<Have> isCheck = haveRepository.findByUserIdAndGameId(userId, gameId);
		IsBooleanRes isboolean = new IsBooleanRes();
		if(isCheck.isPresent()) isboolean.setCheck(true);
		else isboolean.setCheck(false);
		return isboolean;
	}

	@Override
	public IsBooleanRes isLike(String userId, int gameId) {
		Optional<Like> isCheck = likeRepository.findByUserIdAndGameId(userId, gameId);
		IsBooleanRes isboolean = new IsBooleanRes();
		if(isCheck.isPresent()) isboolean.setCheck(true);
		else isboolean.setCheck(false);
		return isboolean;
	}

	@Override
	public List<NewGameListResponse> getNewGames() {
		return gameRepository.findTop30ByOrderByPublishedYearDesc()
				.map(NewGameListResponse::new)
				.collect(Collectors.toList());
	}

}
