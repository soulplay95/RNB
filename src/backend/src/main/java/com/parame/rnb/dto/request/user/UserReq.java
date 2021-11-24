package com.parame.rnb.dto.request.user;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserReq {
    private String nickname;
    private String email;
    private String password;
    private String profile_img;
}
