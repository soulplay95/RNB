package com.parame.rnb.controller;

import javax.servlet.http.HttpServletRequest;

import com.parame.rnb.api.JwtApi;
import com.parame.rnb.domain.game.Game;
import com.parame.rnb.dto.request.game.*;
import com.parame.rnb.dto.response.game.*;
import com.parame.rnb.dto.response.recruitment.RecruitmentResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.parame.rnb.service.GameService;

import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.Cacheable;

import java.util.List;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequiredArgsConstructor
@RequestMapping("/game")
@RestController
public class GameController {

	final private GameService gameService;
	private final JwtApi jwtApi;

	@ApiOperation(value = "[조회] 전체 게임 리스트 조회", notes = "19230개의 전체 게임 목록을 조회한다.")
	@GetMapping("/all")
	public ResponseEntity<List<Game>> findAll() {
		return ResponseEntity.status(200).body(gameService.findAll());
	}
	
//	@ApiOperation(value = "보드게임 찜하기")
	@PostMapping("/like")
	public ResponseEntity<LikeGameRes> likeGame(HttpServletRequest req, @RequestBody LikeGameReq likeGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new LikeGameRes(gameService.likeGame(userId, likeGameReq)));
	}
	
//	@ApiOperation(value = "보드게임 찜 해제하기")
	@DeleteMapping("/unlike")
	public ResponseEntity<LikeGameRes> unlikeGame(HttpServletRequest req, @RequestBody LikeGameReq likeGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new LikeGameRes(gameService.unlikeGame(userId, likeGameReq)));
	}

//	@ApiOperation(value = "보드게임 찜 목록 보기")
	@GetMapping("/likelist")
	public ResponseEntity<LikeListGameRes> likeListGame(HttpServletRequest req){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(gameService.likeListGame(userId));
	}

//	@ApiOperation(value = "가지고 있는 보드게임 추가하기")
	@PostMapping("/add")
	public ResponseEntity<HaveGameRes> addGame(HttpServletRequest req, @RequestBody HaveGameReq haveGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new HaveGameRes(gameService.addGame(userId, haveGameReq)));
	}
	
//	@ApiOperation(value = "가지고 있는 보드게임 삭제하기")
	@DeleteMapping("/remove")
	public ResponseEntity<HaveGameRes> removeGame(HttpServletRequest req, @RequestBody HaveGameReq haveGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new HaveGameRes(gameService.removeGame(userId, haveGameReq)));
	}
	
//	@ApiOperation(value = "가지고 있는 보드게임 목록 보기")
	@GetMapping("/havelist")
	public ResponseEntity<HaveListGameRes> haveListGame(HttpServletRequest req){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(gameService.haveListGame(userId));
	}

//	@ApiOperation(value = "보드게임 리뷰 작성하기")
	@PostMapping("/review")
	public ResponseEntity<ReviewGameRes> reviewGame(HttpServletRequest req, @RequestBody ReviewGameReq reviewGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new ReviewGameRes(gameService.reviewGame(userId, reviewGameReq)));
	}
	
//	@ApiOperation(value = "보드게임 평점 작성하기")
	@PostMapping("/rating")
	public ResponseEntity<ReviewGameRes> ratingGame(HttpServletRequest req, @RequestBody RatingGameReq ratingGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new ReviewGameRes(gameService.ratingGame(userId, ratingGameReq)));
	}
	
//	@ApiOperation(value = "보드게임 난이도 평가하기")
	@PostMapping("/level")
	public ResponseEntity<LevelGameRes> levelGame(HttpServletRequest req, @RequestBody LevelGameReq levelGameReq){
		String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(new LevelGameRes(gameService.levelGame(userId, levelGameReq)));
	}

//	@ApiOperation(value = "보드게임 상세 보기")
	@GetMapping("/info")
	public ResponseEntity<InfoGameRes> infoGame(@RequestParam int gameId, HttpServletRequest req){
		String auth = req.getHeader("Authorization");
		if (auth == null) {
			return ResponseEntity.status(200).body(gameService.infoGame(null, gameId));
		}
		String token = auth.substring(7);
		String userId = jwtApi.getUserid(token);

		return ResponseEntity.status(200).body(gameService.infoGame(userId, gameId));
	}

	@ApiOperation(value = "[조회] 최근 상세보기한 게임 리스트", notes = "최근 상세보기한 게임 리스트를 조회한다. 일주일간 유지")
	@GetMapping("/recent")
	public ResponseEntity<List<GameResponse>> findAllByName(HttpServletRequest req) {
		String token = req.getHeader("Authorization").substring(7);
		String userId = jwtApi.getUserid(token);

		return ResponseEntity.status(200).body(gameService.findRecent(userId));
	}

	@ApiOperation(value = "[조회] 리스트 By 게임 이름", notes = "게임 이름으로 검색한다.")
	@GetMapping("/search/{name}")
	public ResponseEntity<List<GameResponse>> findAllByName(
			@ApiParam(value = "게임 이름", required = true)
			@PathVariable String name) {
		return ResponseEntity.status(200).body(gameService.findAllByName(name));
	}

	@ApiOperation(value = "[조회] 장르 조회", notes = "장르별 등장 횟수에 따라 내림차순 정렬하여 조회한다.")
	@GetMapping("/genre")
	public ResponseEntity<List<GenreCountsResponse>> getGenreList() {
		return ResponseEntity.status(200).body(gameService.getGenreList());
	}

	@ApiOperation(value = "[조회] 리스트 By 인원, 시간, 장르", notes = "상세검색. 인원, 시간, 장르로 검색한다.")
	@PostMapping("/search")
	public ResponseEntity<List<GameResponse>> detailSerach(
			@ApiParam(value = "상세 검색 정보", required = true)
			@RequestBody GameDetailSearchRequest request) {

		return ResponseEntity.status(200).body(gameService.detailSearch(request));
	}

	@ApiOperation(value = "[조회] 게임 소유 여부", notes = "게임아이디로 해당 유저가 소유중인지 검색한다")
	@GetMapping("/ishave")
	public ResponseEntity<IsBooleanRes> isHave(@RequestParam int gameId, HttpServletRequest req) {
		String token = req.getHeader("Authorization").substring(7);
		String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(gameService.isHave(userId, gameId));
	}

	@ApiOperation(value = "[조회] 게임 찜 여부", notes = "게임아이디로 해당 유저가 찜한지 검색한다")
	@GetMapping("/islike")
	public ResponseEntity<IsBooleanRes> isLike(@RequestParam int gameId, HttpServletRequest req) {
		String token = req.getHeader("Authorization").substring(7);
		String userId = jwtApi.getUserid(token);
		return ResponseEntity.status(200).body(gameService.isLike(userId, gameId));
	}

	@ApiOperation(value = "[조회] 연도별 내림차순 정렬된 게임 데이터 n개", notes = "최신 발매된 게임 목록을 n개 조회한다.")
	@Cacheable(value = "newGames")
	@GetMapping("/new")
	public ResponseEntity<List<NewGameListResponse>> getNewGames() {
		return ResponseEntity.status(200).body(gameService.getNewGames());
	}

}
