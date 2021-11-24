package com.parame.rnb.api;


import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Component
public class RecommendApi {

    private final String url = "http://3.35.47.101:8088/recommend";

    public List<Integer> ratingRecommend() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(10000); // 읽기시간초과, ms
        factory.setConnectTimeout(6000); // 연결시간초과, ms
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100) // connection pool 적용
                .setMaxConnPerRoute(5) // connection pool 적용
                .build();
        factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
        RestTemplate restTemplate = new RestTemplate(factory);
        String uurl = url + "/board/ratingRecommend";
        String obj = restTemplate.getForObject(uurl, String.class);
        JSONParser parser = new JSONParser();
        List<Integer> list = new ArrayList<>();
        try {
            JSONObject jobj = (JSONObject) parser.parse(obj);
            JSONArray jArray = (JSONArray) jobj.get("board");
            for(int i=0; i<jArray.size(); i++) {
                list.add(Integer.parseInt((String) jArray.get(i)));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }

    public List<Integer> getSimilar(int gameId) {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(10000); // 읽기시간초과, ms
        factory.setConnectTimeout(6000); // 연결시간초과, ms
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100) // connection pool 적용
                .setMaxConnPerRoute(5) // connection pool 적용
                .build();
        factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
        RestTemplate restTemplate = new RestTemplate(factory);
        String uurl = url + "/board/similar/" + gameId;
        String obj = restTemplate.getForObject(uurl, String.class);
        JSONParser parser = new JSONParser();
        List<Integer> list = new ArrayList<>();
        try {
            JSONObject jobj = (JSONObject) parser.parse(obj);
            JSONArray jArray = (JSONArray) jobj.get("board");
            for(int i=0; i<jArray.size(); i++) {
                list.add(Integer.parseInt((String) jArray.get(i)));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }

    public Long userSimilar(String user1, String user2) {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(10000); // 읽기시간초과, ms
        factory.setConnectTimeout(6000); // 연결시간초과, ms
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100) // connection pool 적용
                .setMaxConnPerRoute(5) // connection pool 적용
                .build();
        factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
        RestTemplate restTemplate = new RestTemplate(factory);
        String uurl = url + "/board/userSimilar/"+user1+"/"+user2;
        String obj = restTemplate.getForObject(uurl, String.class);
        JSONParser parser = new JSONParser();
        List<Integer> list = new ArrayList<>();
        long getSim = 0;
        try {
            JSONObject jobj = (JSONObject) parser.parse(obj);
            getSim = (Long) jobj.get("userSimilar");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return getSim;
    }

    public List<Integer> recommend(int gameId, String user) {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(10000); // 읽기시간초과, ms
        factory.setConnectTimeout(6000); // 연결시간초과, ms
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100) // connection pool 적용
                .setMaxConnPerRoute(5) // connection pool 적용
                .build();
        factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
        RestTemplate restTemplate = new RestTemplate(factory);
        String uurl = url + "/board/pesronalSimilar/"+gameId+"/"+user;
        String obj = restTemplate.getForObject(uurl, String.class);
        JSONParser parser = new JSONParser();
        List<Integer> list = new ArrayList<>();
        try {
            JSONObject jobj = (JSONObject) parser.parse(obj);
            JSONArray jArray = (JSONArray) jobj.get("board");
            for(int i=0; i<jArray.size(); i++) {
                list.add(Integer.parseInt((String) jArray.get(i)));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }

    public List<Integer> ratingRecommend() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(10000); // 읽기시간초과, ms
        factory.setConnectTimeout(6000); // 연결시간초과, ms
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100) // connection pool 적용
                .setMaxConnPerRoute(5) // connection pool 적용
                .build();
        factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
        RestTemplate restTemplate = new RestTemplate(factory);
        String uurl = url + "/board/ratingRecommend";
        String obj = restTemplate.getForObject(uurl, String.class);
        JSONParser parser = new JSONParser();
        List<Integer> list = new ArrayList<>();
        try {
            JSONObject jobj = (JSONObject) parser.parse(obj);
            JSONArray jArray = (JSONArray) jobj.get("board");
            for(int i=0; i<jArray.size(); i++) {
                list.add(Integer.parseInt((String) jArray.get(i)));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }

}
