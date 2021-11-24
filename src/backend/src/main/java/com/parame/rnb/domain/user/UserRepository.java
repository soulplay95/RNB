package com.parame.rnb.domain.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "SELECT u FROM User u where u.email = :email", nativeQuery = true)
    Optional<User> findByEmail2(@Param("email") String email);

    User findByEmail(String email);

    User findByNickname(String nickname);

    User save(User user);

    User findByUserid(String userid);

    List<User> findAll();

    // 인기도 올리기
    @Modifying
    @Query("UPDATE User u set u.likes = u.likes + 1 where u.userid = :userId")
    void up(@Param("userId") String userId);

    // 인기도 내리기
    @Modifying
    @Query("UPDATE User u set u.likes = u.likes - 1 where u.userid = :userId")
    void down(@Param("userId") String userId);

    void deleteByUserid(String userid);

}
