package com.parame.rnb.domain.game;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Item {
    private String title;
    private String link;
    private String image;
    private String lprice;
}
