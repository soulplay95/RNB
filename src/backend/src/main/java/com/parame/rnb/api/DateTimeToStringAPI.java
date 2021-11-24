package com.parame.rnb.api;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class DateTimeToStringAPI {

    /**
     * 날짜 형식을 문자열로 변환
     * @param time
     * @return String
     */
    public static String dateTimeToString(LocalDateTime time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return Optional.ofNullable(time)
                .map(formatter::format)
                .orElse("");
    }

}
