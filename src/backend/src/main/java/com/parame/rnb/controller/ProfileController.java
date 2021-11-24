package com.parame.rnb.controller;

import com.parame.rnb.api.JwtApi;
import com.parame.rnb.domain.game.Review;
import com.parame.rnb.domain.user.User;
import com.parame.rnb.dto.BaseResponseBody;
import com.parame.rnb.dto.request.profile.ProfileReq;
import com.parame.rnb.dto.response.game.InfoGameRes;
import com.parame.rnb.dto.response.profile.ProfileRes;
import com.parame.rnb.dto.response.profile.ReviewRes;
import com.parame.rnb.dto.response.recruitment.RecruitmentResponse;
import com.parame.rnb.service.GameService;
import com.parame.rnb.service.PlayerService;
import com.parame.rnb.service.RecruitmentService;
import com.parame.rnb.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    private final UserService userService;
    private final GameService gameService;
    private final RecruitmentService recruitmentService;
    private final PasswordEncoder passwordEncoder;
    private final JwtApi jwtApi;

    @GetMapping("/info")
    public ResponseEntity<ProfileRes> getInfo(HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String userid = jwtApi.getUserid(token);
        User user = userService.findByUserid(userid);
        return ResponseEntity.status(200).body(ProfileRes.builder().email(user.getEmail()).nickname(user.getNickname()).profile_img(user.getProfile_img()).like(user.getLikes()).build());
    }

    @PutMapping("/info")
    public ResponseEntity<BaseResponseBody> updateInfo(@RequestBody ProfileReq profileReq, HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String userid = jwtApi.getUserid(token);
        User user = userService.findByUserid(userid);
        userService.userSave(User.builder()
                .userid(user.getUserid())
                .email(user.getEmail())
                .pwd(passwordEncoder.encode(profileReq.getPassword()))
                .role(user.getRole())
                .likes(user.getLikes())
                .sns(user.getSns())
                .nickname(profileReq.getNickname())
                .profile_img(profileReq.getProfile_img())
                .build());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

    @GetMapping("/review")
    public ResponseEntity<List<ReviewRes>> review(HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String userid = jwtApi.getUserid(token);
        List<Review> reviews = gameService.myReview(userid);
        if(reviews == null) return null;
        List<ReviewRes> reviewRes = new ArrayList<>();
        for(Review review : reviews) {
            InfoGameRes infoGame = gameService.infoGame(userid, review.getGameId());
            reviewRes.add(ReviewRes.builder().gameId(review.getGameId()).name(infoGame.getGame().getName()).image(infoGame.getGame().getImage()).rating(review.getRating()).content(review.getContent()==null?" ":review.getContent()).build());
        }
        return ResponseEntity.status(200).body(reviewRes);
    }

    // 모임 관리 - 참여중인 모임 리스트 조회
    @GetMapping("/meet")
    public ResponseEntity<List<RecruitmentResponse>> getListOfMeet(HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String userid = jwtApi.getUserid(token);

        return ResponseEntity.status(200).body(recruitmentService.getListByUserId(userid));
    }

}
