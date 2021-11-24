package com.parame.rnb.dto.request.user;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TempUserReq {
    private String email;
    private String token;
}
