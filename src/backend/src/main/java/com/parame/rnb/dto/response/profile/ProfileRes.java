package com.parame.rnb.dto.response.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRes {
    private String email;
    private String nickname;
    private String profile_img;
    private int like;
}
