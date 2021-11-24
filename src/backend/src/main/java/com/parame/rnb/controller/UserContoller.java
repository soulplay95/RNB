package com.parame.rnb.controller;

import com.parame.rnb.api.JwtApi;
import com.parame.rnb.api.NaverApi;
import com.parame.rnb.api.RedisApi;
import com.parame.rnb.domain.user.Role;
import com.parame.rnb.domain.user.TempUser;
import com.parame.rnb.domain.user.User;
import com.parame.rnb.dto.BaseResponseBody;
import com.parame.rnb.dto.request.user.FindPasswordReq;
import com.parame.rnb.dto.request.user.SignInReq;
import com.parame.rnb.dto.request.user.TempUserReq;
import com.parame.rnb.dto.request.user.UserReq;
import com.parame.rnb.dto.response.profile.ProfileInMeetResponse;
import com.parame.rnb.dto.response.recruitment.RecruitmentDetailResponse;
import com.parame.rnb.dto.response.user.UserRes;
import com.parame.rnb.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

//@Api(description = "좌석 API", tags = {"Seat"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserContoller {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtApi jwtApi;
    private final RedisApi redisApi;
    private final NaverApi naverApi;

    @GetMapping("/test")
    public ResponseEntity<BaseResponseBody> test() throws ParseException {
        System.out.println(naverApi.trans("good morning!"));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

    @PostMapping("/login")
    public ResponseEntity<UserRes> login(@RequestBody SignInReq dto, HttpServletResponse res) {
        User user = null;
        try {
            user = userService.signIn(dto);

            String accessToken = jwtApi.generateAccessToken(user.getUserid(), dto.getEmail());
            String refreshToken = jwtApi.generateRefreshToken(user.getUserid(), dto.getEmail());

            res.setHeader("Authorization", "Bearer " + accessToken);
            redisApi.setData(user.getEmail(), refreshToken,  jwtApi.REFRESH_TOKEN_VALIDATION_SECOND);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.status(200).body(UserRes.builder().userid(user.getUserid()).nickname(user.getNickname()).profile_img(user.getProfile_img()).build());
    }

    @GetMapping("/logout")
    public ResponseEntity<BaseResponseBody> logout(@RequestParam String email) {
        redisApi.deleteData(email);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

    //    @ApiOperation(value = "이메일 중복 체크")
    @GetMapping("/idcheck")
    public ResponseEntity<BaseResponseBody> checkId(@RequestParam(required = true) String email) {
        if(userService.isSameEmail(email)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "중복된 이메일"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

//    @ApiOperation(value = "닉네임 중복 체크")
    @GetMapping("/namecheck")
    public ResponseEntity<BaseResponseBody> checkNickname(@RequestParam(required = true) String nickname) {
        if(userService.isSameNickname(nickname)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "중복된 닉네임"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

//    @ApiOperation(value = "임시정보 저장 => email값 전달")
    @PostMapping("/temp")
    public ResponseEntity<BaseResponseBody> tempJoin(@RequestBody TempUserReq tempUserDto) {
        String emailCode = userService.randomCode();
        try {
            userService.tempSaveAndSendEmail(TempUser.builder()
                    .email(tempUserDto.getEmail()).token(emailCode).isCheck(false).timeToLive(10).build(), tempUserDto.getEmail(), true);
        } catch (Exception e) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, e.getMessage()));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

//    @ApiOperation(value = "인증코드 검사 => email, token 전달")
    @PostMapping("/checkcode")
    public ResponseEntity<BaseResponseBody> checkEmailCode(@RequestBody TempUserReq tempUserDto) {
        Optional<TempUser> tempUser;
        try {
            tempUser = userService.tempUserByEmail(tempUserDto.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "임시 이메일 찾기 실패"));
        }
        if(tempUser.isPresent()) {
            if(!tempUser.get().getToken().equals(tempUserDto.getToken())) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(400, "코드번호 불일치"));
            } else {
                tempUser.get().setCheck(true);
                tempUser.get().setTimeToLive(30);
                userService.tempUserSave(tempUser.get());
            }
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "존재하지 않는 이메일입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "코드번호 일치"));
    }

//    @ApiOperation(value = "이메일 재전송 => email값 전달")
    @GetMapping("/resend")
    public ResponseEntity<BaseResponseBody> tempJoin(@RequestParam(required = true) String email) {
        String emailCode = userService.randomCode();
        Optional<TempUser> tempUser;
        try {
            tempUser = userService.tempUserByEmail(email);
        } catch (Exception e) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "임시 이메일 찾기 실패"));
        }
        if(!tempUser.isPresent()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "존재하지 않는 이메일입니다."));
        } else {
            tempUser.get().setToken(emailCode);
            try {
                userService.tempSaveAndSendEmail(TempUser.builder()
                        .email(tempUser.get().getEmail()).token(emailCode).isCheck(false).timeToLive(10).build(), tempUser.get().getEmail(), true);
            } catch (Exception e) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(400, e.getMessage()));
            }
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이메일 보내기 성공"));
    }

//    @ApiOperation(value = "회원정보 저장 => email, password, image, nickname")
    @PostMapping("/signin")
    public ResponseEntity<BaseResponseBody> join(@RequestBody UserReq userDto) {
        Optional<TempUser> tempUser;
        try {
            tempUser = userService.tempUserByEmail(userDto.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "임시 이메일 찾기 실패"));
        }
        if(!tempUser.isPresent()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "존재하지 않는 이메일입니다."));
        } else {
            if(!tempUser.get().isCheck()) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(400, "인증코드 오류."));
            }
            try {
                String userid = userService.createUserid();
                userService.userSave(User.builder()
                        .userid(userid)
                        .email(userDto.getEmail())
                        .pwd(passwordEncoder.encode(userDto.getPassword()))
                        .role(Role.USER)
                        .likes(0)
                        .sns(0)
                        .nickname(userDto.getNickname())
                        .profile_img(userDto.getProfile_img())
                        .build());
                System.out.println("testk");
                userService.tempUserDelete(userDto.getEmail());
            } catch (Exception e) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(400, "회원가입오류."));
            }
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입 성공."));
    }

//    @ApiOperation(value = "비밀번호찾기 => email")
    @PostMapping("/findpwd")
    public ResponseEntity<BaseResponseBody> findPwd(@RequestBody FindPasswordReq findPasswordDto) {
        String emailCode = userService.randomCode();
        if(userService.findByEmail(findPasswordDto.getEmail()) == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "일치하는 이메일이 없습니다."));
        }
        try {
            userService.tempSaveAndSendEmail(TempUser.builder().email("findPwd:"+findPasswordDto.getEmail()).token(emailCode).timeToLive(5).build(), findPasswordDto.getEmail(), false);
        } catch (Exception e) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, e.getMessage()));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "임시정보 저장 및 전송 성공"));
    }

//    @ApiOperation(value = "변경된 비밀번호 저장 => email, newpwd")
    @PutMapping("/findpwd")
    public ResponseEntity<BaseResponseBody> changeNewPwd(@RequestBody FindPasswordReq findPasswordDto) {
        try {
            if(userService.isTokenConfirm(findPasswordDto.getEmail(), findPasswordDto.getCode())) {
                User user = userService.findByEmail(findPasswordDto.getEmail());
                userService.userSave(User.builder().userid(user.getUserid()).email(user.getEmail()).pwd(passwordEncoder.encode(findPasswordDto.getPassword())).nickname(user.getNickname()).profile_img(user.getProfile_img()).build());
//                userService.userSave(User.builder().userid(user.getUserid()).email(user.getEmail()).password(findPasswordDto.getPassword()).nickname(user.getNickname()).profile_img(user.getProfile_img()).build());
            } else {
                return ResponseEntity.status(200).body(BaseResponseBody.of(400, "fail"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "error"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
    }

    @ApiOperation(value = "[수정] 인기도 올리기", notes = "해당 유저의 인기도를 1올린다")
    @PutMapping("/like/{userId}")
    public ResponseEntity<? extends BaseResponseBody> upPopularity(
            @ApiParam(value = "유저 ID", required = true)
            @PathVariable String userId) {
        userService.upPopularity(userId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @ApiOperation(value = "[수정] 인기도 내리기", notes = "해당 유저의 인기도를 1내린다.")
    @PutMapping("/unlike/{userId}")
    public ResponseEntity<? extends BaseResponseBody> downPopularity(
            @ApiParam(value = "유저 ID", required = true)
            @PathVariable String userId) {
        userService.downPopularity(userId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @ApiOperation(value = "[조회] 모임 내 멤버의 정보 보기", notes = "해당 유저의 상세 정보를 조회한다.")
    @GetMapping("/show/{userId}")
    public ResponseEntity<ProfileInMeetResponse> show(
            @ApiParam(value = "유저 ID", required = true)
            @PathVariable String userId,
            HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String myId = jwtApi.getUserid(token); // 로그인한 사용자의 ID

        return ResponseEntity.status(200).body(userService.getDetailUser(myId, userId));
    }

    @ApiOperation(value = "[삭제] 회원 탈퇴", notes = "로그인한 유저 탈퇴")
    @DeleteMapping("/signout")
    public ResponseEntity<? extends BaseResponseBody> signout(HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        String myId = jwtApi.getUserid(token); // 로그인한 사용자의 ID

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

}
