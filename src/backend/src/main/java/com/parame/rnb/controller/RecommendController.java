package com.parame.rnb.controller;

import com.parame.rnb.api.JwtApi;
import com.parame.rnb.dto.response.game.GameResponse;
import com.parame.rnb.dto.response.game.UserSimRes;
import com.parame.rnb.service.GameService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequiredArgsConstructor
@RequestMapping("/recommend")
@RestController
public class RecommendController {
    final private GameService gameService;
    private final JwtApi jwtApi;

    @ApiOperation(value = "[추천] 유저 유사도", notes = "유저끼리 유사도.")
    @GetMapping("/userSimilar")
    public ResponseEntity<UserSimRes> userSimilar(@RequestParam String userId, HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String mainId = jwtApi.getUserid(token);
        return ResponseEntity.status(200).body(gameService.userSimilar(mainId, userId));
    }

    @ApiOperation(value = "[추천] 사용자 추천", notes = "사용자 개인화 추천.")
    @GetMapping("/userRecommend")
    public ResponseEntity<List<GameResponse>> userRecommend(HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String userId = jwtApi.getUserid(token);

        return ResponseEntity.status(200).body(gameService.personalRecommend(userId));
//        return ResponseEntity.status(200).body(gameService.personalRecommend("dba6b7d7-fae6-4b73-9143-2a6ea304a91a"));
    }

    @ApiOperation(value = "[추천] 평점순 추천", notes = "비회원 추천.")
    @GetMapping("/ratingRecommend")
    public ResponseEntity<List<GameResponse>> userRecommend() {
        return ResponseEntity.status(200).body(gameService.ratingRecommend());
    }
}