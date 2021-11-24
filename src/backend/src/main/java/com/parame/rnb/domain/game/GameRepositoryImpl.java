package com.parame.rnb.domain.game;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.stream.Stream;

@Transactional
public class GameRepositoryImpl implements GameRepositoryCustom {

    private final EntityManager em;

    public GameRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Stream<Game> detailSearch(Integer people, Integer time, String[] genres) {
        QGame qGame = QGame.game;
        JPAQuery query = new JPAQuery(em);

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(qGame.minPeople.loe(people));
        builder.and(qGame.maxPeople.goe(people));
        builder.and(qGame.minTime.loe(time));
        builder.and(qGame.maxTime.goe(time));
        for (String genre : genres) {
            System.out.println(genre);
            builder.and(qGame.genre.like("%" + genre + "%"));
        }

        System.out.println(builder.getValue());

        query.select(qGame)
                .from(qGame)
                .where(builder);

        return query.fetch().stream();
    }

}

