package com.parame.rnb.domain.game;

import java.util.stream.Stream;

public interface GameRepositoryCustom {

    // 상세 검색
    Stream<Game> detailSearch(Integer people, Integer time, String[] genres);

}
