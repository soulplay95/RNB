package com.parame.rnb.service;

import com.parame.rnb.domain.player.PlayerRepository;
import com.parame.rnb.domain.recruit.Recruitment;
import com.parame.rnb.domain.recruit.RecruitmentRepository;
import com.parame.rnb.dto.request.player.PlayerDeleteRequest;
import com.parame.rnb.dto.request.player.PlayerSaveRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@AllArgsConstructor
@Transactional
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final RecruitmentRepository recruitmentRepository;

    /**
     * [등록] 모임 참가 요청
     *
     * @param request
     * @return guestId
     */
    public void save(PlayerSaveRequest request) {
        Integer recruitmentId = request.getRecruitmentId();
        String userId = request.getUserId();

        // Recruitment 테이블의 현재인원수를 1 증가시킨다.
        // 이때, 최대 인원수랑 같아지면 complete를 true로 변경.
        Recruitment entity = recruitmentRepository.findByRecruitmentId(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID를 가진 구인글이 없습니다."));
        if (entity.getNowParticipant() + 1 == entity.getMaxParticipant()) { // 참가함으로써 방이 꽉차면
            // complete true로 업데이트
            recruitmentRepository.update(recruitmentId);
        }
        // 현재인원수 1증가
        recruitmentRepository.plus(recruitmentId);

        // Player(Guest) 테이블에 INSERT
        playerRepository.save(request.toEntity());
    }

    /**
     * [삭제] 모임에서 나가기
     */
    public void deleteByRecruitmentIdAndUserIdAnd(Integer recruitmentId, String userId) {
        // 방장인지 확인(Recruitment 테이블의 user_id와 일치 여부로)하고 방장이면 방 터뜨림
        Recruitment entity = recruitmentRepository.findByRecruitmentId(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID를 가진 구인글이 없습니다."));
        if (entity.getUserId().equals(userId)) { // 방장이면
            // 방 터뜨린다. => recruitment 테이블의 레코드만 삭제하면 ON DELETE CASCADE로 Player 테이블도 자동 삭제
            recruitmentRepository.deleteById(recruitmentId);
        } else { // 게스트이면
            // 현재 인원수 1 감소(음수로 떨어지는 조건 체크 안해도 된다. 게스트이므로 현재 인원은 2이상일테니까)
            recruitmentRepository.kick(recruitmentId);

            // player 테이블에서 삭제
            playerRepository.deleteByRecruitmentIdAndUserIdAnd(recruitmentId, userId);
        }
    }

    /**
     * 강퇴하기
     */
    public void kick(Integer recruitmentId, String userId) {
        // 모임 현재 인원수 -1
        recruitmentRepository.kick(recruitmentId);

        // player 테이블에서 삭제
        playerRepository.deleteByRecruitmentIdAndUserIdAnd(recruitmentId, userId);
    }

}
