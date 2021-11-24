package com.parame.rnb.config;

import com.parame.rnb.api.JwtApi;
import com.parame.rnb.api.RedisApi;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtApi jwtApi;
    private final RedisApi redisApi;

    public JwtAuthenticationFilter(JwtApi jwtApi, RedisApi redisApi) {
        this.jwtApi = jwtApi;
        this.redisApi = redisApi;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest)servletRequest;
        String token = req.getHeader("Authorization");
        String email = null;
        String refreshToken = null;

        try {
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                logger.info("token : " + token);
                email = jwtApi.getEmail(token);
                Authentication authentication = jwtApi.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch(ExpiredJwtException e) {
            email = e.getClaims().get("email", String.class);
            logger.info("email : " + email);
            refreshToken = redisApi.getData(email);
        } catch(Exception e) {
            e.printStackTrace();
        }

        try {
            if (refreshToken != null) {
                if (email.equals(jwtApi.getEmail(refreshToken))) {
                    String newToken = jwtApi.generateAccessToken(jwtApi.getUserid(refreshToken), email);
                    Authentication authentication = jwtApi.getAuthentication(newToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    HttpServletResponse response = (HttpServletResponse) servletResponse;
                    response.addHeader("Authorization", "Bearer " + newToken);
                }
            }
        } catch(ExpiredJwtException e) {

        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
