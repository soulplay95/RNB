package com.parame.rnb.domain.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @Column(name = "user_id")
    private String userid;
    private String email;
    @Column(name = "password")
    private String pwd;
    private String nickname;
    private int sns;
//    @Column(name = "type")
//    private int grader;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String profile_img;
    @Column(name = "popularity")
    private int likes;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        return authorities;
    }

    @Builder
    public User(String nickname, String email, String profile_img, Role role) {
        this.nickname = nickname;
        this.email = email;
        this.profile_img = profile_img;
        this.role = role;
    }

    public User update(String nickname, String profile_img) {
        this.nickname = nickname;
        this.profile_img = profile_img;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return email;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return null;
    }

}
