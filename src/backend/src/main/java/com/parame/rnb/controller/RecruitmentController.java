package com.parame.rnb.controller;

import com.parame.rnb.dto.BaseResponseBody;
import com.parame.rnb.dto.request.player.PlayerSaveRequest;
import com.parame.rnb.dto.response.recruitment.RecruitmentDetailResponse;
import com.parame.rnb.dto.response.recruitment.RecruitmentResponse;
import com.parame.rnb.dto.request.recruiment.RecruitmentSaveRequest;
import com.parame.rnb.service.PlayerService;
import com.parame.rnb.service.RecruitmentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(description = "구인(모임) API", tags = {"Recruit"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/recruit")
public class RecruitmentController {

    private final RecruitmentService recruitmentService;
    private final PlayerService playerService;

    @ApiOperation(value = "[등록]", notes = "구인글을 등록한다.")
    @PostMapping("/write")
    public ResponseEntity<? extends BaseResponseBody> save(
            @ApiParam(value = "구인글 정보", required = true)
            @RequestBody RecruitmentSaveRequest request) {
        recruitmentService.save(request);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @ApiOperation(value = "[등록]", notes = "모임 참가 요청을한다.")
    @PostMapping("/join")
    public ResponseEntity<? extends BaseResponseBody> save2(
            @ApiParam(value = "게스트 정보", required = true)
            @RequestBody PlayerSaveRequest request) {
        playerService.save(request);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @ApiOperation(value = "[삭제]", notes = "모임에서 나간다.(방장이면 방 터짐)")
    @DeleteMapping("/out/{recruitmentId}/{userId}")
    public ResponseEntity<? extends BaseResponseBody> deleteByRecruitmentIdAndUserIdAnd(
            @ApiParam(value = "구인글 ID", required = true)
            @PathVariable Integer recruitmentId,
            @ApiParam(value = "유저 ID", required = true)
            @PathVariable String userId) {
        playerService.deleteByRecruitmentIdAndUserIdAnd(recruitmentId, userId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @ApiOperation(value = "[조회] 리스트 By 지역명", notes = "지역명으로 구인글 리스트를 조회한다.")
    @GetMapping("/{place}")
    public ResponseEntity<List<RecruitmentResponse>> findAllByPlace(
            @ApiParam(value = "지역명", required = true)
            @PathVariable String place) {

        return ResponseEntity.status(200).body(recruitmentService.findAllByPlace(
//                URLEncoder.encode(place, StandardCharsets.UTF_8.toString())
                place
        ));
    }

    @ApiOperation(value = "[조회] By 구인글 ID", notes = "구인글 ID로 모임 상세조회한다.")
    @GetMapping("/detail/{recruitmentId}")
    public ResponseEntity<RecruitmentDetailResponse> findByRecruitmentId(
            @ApiParam(value = "구인글 ID", required = true)
            @PathVariable Integer recruitmentId) {

        return ResponseEntity.status(200).body(recruitmentService.findByRecruitmentId(recruitmentId));
    }

    @ApiOperation(value = "[수정]", notes = "구인글 상태를 모집완료로 수정한다.")
    @PutMapping("/host/end/{recruitmentId}")
    public ResponseEntity<? extends BaseResponseBody> update(
            @ApiParam(value = "구인글 ID", required = true)
            @PathVariable Integer recruitmentId) {

        recruitmentService.update(recruitmentId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @ApiOperation(value = "[삭제]", notes = "호스트가 게스트를 모임에서 강퇴한다.")
    @DeleteMapping("/host/kick/{recruitmentId}/{userId}")
    public ResponseEntity<? extends BaseResponseBody> kick(
            @ApiParam(value = "구인글 ID", required = true)
            @PathVariable Integer recruitmentId,
            @ApiParam(value = "유저 ID", required = true)
            @PathVariable String userId) {
        playerService.kick(recruitmentId, userId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

}
