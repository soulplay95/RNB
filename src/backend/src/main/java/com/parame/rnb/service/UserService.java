package com.parame.rnb.service;


import com.parame.rnb.domain.user.TempUser;
import com.parame.rnb.domain.user.TempUserRepository;
import com.parame.rnb.domain.user.User;
import com.parame.rnb.domain.user.UserRepository;
import com.parame.rnb.dto.request.user.SignInReq;
import com.parame.rnb.dto.response.game.HaveListGameRes;
import com.parame.rnb.dto.response.game.UserSimRes;
import com.parame.rnb.dto.response.profile.ProfileInMeetResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TempUserRepository tempUserRepository;

    @Autowired
    private GameService gameService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private JavaMailSender javaMailSender;

    public UserService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public User signIn(SignInReq dto) throws Exception {
        User user = findByEmail(dto.getEmail());

        if(user == null)
            throw new Exception("회원이 존재하지 않습니다.");

        if(!passwordEncoder.matches(dto.getPassword(), user.getPwd())) {
            throw new Exception("비밀번호가 틀립니다.");
        }
        return user;
    }

    //중복 이메일 체크
    public boolean isSameEmail(String email) {
        if(findByEmail(email) != null) {
            return true;
        }
        return false;
    }
    //중복 닉네임 체크
    public boolean isSameNickname(String nickname) {
        if(userRepository.findByNickname(nickname) != null) {
            return true;
        }
        return false;
    }

    // 레디스에 이메일(기본키), 인증코드 저장
    public void tempUserSave(TempUser tempUserDto) {
        TempUser tempUser = tempUserDto;
        tempUserRepository.save(tempUser);
    }
    //이메일 랜덤 대문자 + 숫자 8개 choice
    public String randomCode() {
        StringBuffer sb = new StringBuffer();
        Random rand = new Random();
        for(int i=0; i<8; i++) {
            int randNum = rand.nextInt(2);
            if(randNum == 0) {
                sb.append((char)((int)(rand.nextInt(26)+'A')));
            } else {
                sb.append(rand.nextInt(10));
            }
        }
        return sb.toString();
    }
    //레디스에서 email 키로 삭제
    public void tempUserDelete(String email) {
        tempUserRepository.deleteById(email);
    }

    //레디스에서 email 키로 찾기
    public Optional<TempUser> tempUserByEmail(String email) {
        return tempUserRepository.findById(email);
    }

    //이메일 보내기
    public void sendMail(String toEmail, String subject, TempUser tempUser, boolean joinOrFind) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("OHNACO"); //보내는사람
        helper.setTo(toEmail); //받는사람
        helper.setSubject(subject); //메일제목
        StringBuffer sb = new StringBuffer();
        sb.append("<!DOCTYPE html>");
        sb.append("<html>");
        sb.append("<head>");
        sb.append("</head>");
        sb.append("<body>");
        sb.append(" <div" +
                "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #00BCD4; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">" +
                "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">" +
                "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">RNB</span><br />" +
                "		<span style=\"color: #00BCD4\">메일인증</span> 안내입니다." +
                "	</h1>\n" +
                "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">" +
                "		안녕하세요.<br />" +
                "		RNB에 가입해 주셔서 진심으로 감사드립니다.<br />");
        if(joinOrFind) {
            sb.append("		아래 <b style=\"color: #00BCD4\">'메일 인증 코드'</b>를 입력하셔서 회원가입을 완료해 주세요.<br />" +
                    "		감사합니다." +
                    "	</p>" +
                    "	<p" +
                    "		style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #607D8B; color: white; line-height: 45px; vertical-align: middle; font-size: 16px;\">" +
                    tempUser.getToken()
            );
        } else {
            sb.append("		아래 <b style=\"color: #02b875\">'패스워드 변경 링크'</b>를 클릭하여서 패스워드 변경을 완료해 주세요.<br />" +
                    "		감사합니다." +
                    "	</p>" +
                    "	<p" +
                    "		style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #02b875; line-height: 45px; vertical-align: middle; font-size: 16px;\">"
            );
            sb.append("<a href='http://localhost:8080/api/user/findpwd?email=" +
                    toEmail +
                    "&code=" +
                    tempUser.getToken() +
                    "' target='_blank'>이메일 인증 확인</a>"
            );
        }
        sb.append("		</p>" +
                "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>" +
                " </div>");
        sb.append("</body>");
        sb.append("</html>");
        helper.setText(sb.toString(), true); //ture넣을경우 html

        javaMailSender.send(mimeMessage);
    }

    //유저 정보 저장
    public void userSave(User user) {
        userRepository.save(user);
    }

    //유저아이디 랜덤값 생성
    //이메일 랜덤 대문자 + 숫자 8개 choice
    public String createUserid() {
//        StringBuffer sb = new StringBuffer();
//        Random rand = new Random();
//        do {
//            for (int i = 0; i < 13; i++) {
//                int randNum = rand.nextInt(2);
//                if (randNum == 0) {
//                    sb.append((char) ((int) (rand.nextInt(26) + 'A')));
//                } else {
//                    sb.append(rand.nextInt(10));
//                }
//            }
//        } while(userRepository.findByUserid(sb.toString()) != null);
//        return sb.toString();
        return UUID.randomUUID().toString();
    }

    //임시저장 및 이메일 전송
    public void tempSaveAndSendEmail(TempUser tempUser, String toEmail, boolean joinOrFind) throws Exception {
        tempUserRepository.save(tempUser);
        try {
            tempUserRepository.save(tempUser);
        } catch(Exception e) {
            throw new Exception("임시회원 저장 오류.");
        }
        try {
            //********************************유저 이메일로 변경해줘야함!!************************
            sendMail(toEmail,"[RNB 이메일 인증 코드]", tempUser, joinOrFind);
        } catch(MessagingException e) {
            throw new Exception("메일 보내기 오류.");
        }
    }

    //패스워드 찾기 redis에 저장된 값과 비교
    public boolean isTokenConfirm(String email, String token) throws Exception {
        Optional<TempUser> tempUserDto;
        try {
            tempUserDto = tempUserRepository.findById("findPwd:" + email);
        } catch (Exception e) {
            throw new Exception("이메일 찾기 오류");
        }
        if(tempUserDto.isPresent()) {
            if(tempUserDto.get().getToken().equals(token)) {
                return true;
            }
        }
        return false;
    }

    // 유저 이메일로 찾기
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    //유저 아이디로 찾기
    public User findByUserid(String userid) {
        return userRepository.findByUserid(userid);
    }

    //패스워드 체크
    public boolean checkPassword(String password, User user) {
        return passwordEncoder.matches(password, user.getPwd());
    }

//    public void deleteUser(String userid) {
//        userRepository.deleteByUserid(userid);
//    }

    /**
     * 인기도 올리기
     */
    @Transactional
    public void upPopularity(String userId) {
        userRepository.up(userId);
    }

    /**
     * 인기도 내리기
     */
    @Transactional
    public void downPopularity(String userId) {
        userRepository.down(userId);
    }

    /**
     * 모임 내 유저 상세보기
     */
    @Transactional
    public ProfileInMeetResponse getDetailUser(String myId, String userId) {
        // 1. userId로 프사, 닉네임, 인기도 정보 채우기
        User entity = userRepository.findByUserid(userId);
        
        // 2. 유사도 구하기
        UserSimRes sim = gameService.userSimilar(myId, userId);
        
        // 3. 소유중인 게임 리스트 구하기
        HaveListGameRes list = gameService.haveListGame(userId);

        return new ProfileInMeetResponse(userId, entity.getProfile_img(), entity.getNickname(),
                entity.getLikes(), sim, list);
    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public void signout(String userId) {
        userRepository.deleteByUserid(userId);
    }

}
