package com.parame.rnb.service;

import com.parame.rnb.domain.player.Player;
import com.parame.rnb.domain.player.PlayerRepository;
import com.parame.rnb.domain.recruit.Recruitment;
import com.parame.rnb.domain.recruit.RecruitmentRepository;
import com.parame.rnb.domain.user.User;
import com.parame.rnb.domain.user.UserRepository;
import com.parame.rnb.dto.request.recruiment.RecruitmentSaveRequest;
import com.parame.rnb.dto.response.player.PlayerResponse;
import com.parame.rnb.dto.response.recruitment.RecruitmentDetailResponse;
import com.parame.rnb.dto.response.recruitment.RecruitmentResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Transactional
@Service
public class RecruitmentService {

    private final RecruitmentRepository recruitmentRepository;
    private final PlayerRepository playerRepository;
    private final UserRepository userRepository;

    /**
     * 등록
     * @param request
     * @return ID
     */
    public Integer save(RecruitmentSaveRequest request) {
        return recruitmentRepository.save(request.toEntity()).getRecruitmentId();
    }

    /**
     * 지역명으로 구인글 리스트 조회
     * @param place
     * @return 구인글 리스트
     */
    public List<RecruitmentResponse> findAllByPlace(String place) {
        return recruitmentRepository.findAllByPlace(place)
                .map(RecruitmentResponse::new)
                .collect(Collectors.toList());
    }

    /**
     * [조회] 구인글ID로 조회
     * @param recruitmentId
     * @return
     */
    public RecruitmentDetailResponse findByRecruitmentId(Integer recruitmentId) {
        Recruitment entity = recruitmentRepository.findByRecruitmentId(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException(recruitmentId + "ID를 가진 구인글이 존재하지 않습니다."));

        RecruitmentDetailResponse result = new RecruitmentDetailResponse(entity);

        List<PlayerResponse> result2 = new ArrayList<>();

        List<Player> participants = playerRepository.findAllByRecruitmentId(recruitmentId)
                .collect(Collectors.toList());

        for (Player p : participants) {
            String userId = p.getUserId();
            User user = userRepository.findByUserid(userId);

            result2.add(new PlayerResponse(p, user));
        }

        result.setParticipants(result2);

        return result;
    }

    /**
     * [수정] 모집 완료로 수정
     * @param recruitmentId
     */
    public void update(Integer recruitmentId) {
        recruitmentRepository.update(recruitmentId);
    }

    /**
     * 유저 ID로 참여중인 모임 리스트 조회
     */
    public List<RecruitmentResponse> getListByUserId(String userId) {
        // 게스트로 참여중인 모임 리스트
        List<Player> list = playerRepository.findAllByUserId(userId)
                .collect(Collectors.toList());

        List<RecruitmentResponse> result = new ArrayList<>();
        // 호스트 여부는 FE에서 체크
        for (Player p : list) {
            Integer recruitmentId = p.getRecruitmentId(); // 구인글 ID
            Recruitment entity = recruitmentRepository.findByRecruitmentId(recruitmentId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 ID를 가진 구인글이 없습니다."));

            result.add(new RecruitmentResponse(entity));
        }

        // 호스트인 모임 리스트
        List<Recruitment> list2 = recruitmentRepository.findAllByUserId(userId)
                .collect(Collectors.toList());
        for (Recruitment r : list2) {
            result.add(new RecruitmentResponse(r));
        }

        return result;
    }

}
