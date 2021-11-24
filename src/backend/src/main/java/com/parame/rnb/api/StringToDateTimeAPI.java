package com.parame.rnb.api;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class StringToDateTimeAPI {

    /**
     * 문자열 형식을 날짜 형식으로 변환
     * @param str
     * @return LocalDateTime
     */
    public static LocalDateTime stringToDateTime(String str) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // null 입력 시 특정 시간으로 초기화
        if (str == null) {
            str = "1999-01-01 00:00:00";
        }

        return LocalDateTime.parse(str, formatter);
    }

}
