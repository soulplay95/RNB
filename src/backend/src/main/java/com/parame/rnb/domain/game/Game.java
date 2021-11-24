package com.parame.rnb.domain.game;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@NoArgsConstructor
@Entity
@Builder
@Getter
@Setter
@ToString
@Table(name = "game")
public class Game {
	
	// python에서 id 기본 컬럼명이 id로 자동생성됨
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty
	private int id;
	
	@Column(name = "original_id")
	@JsonProperty
	private int originalId;
	@JsonProperty
	private String name;
	@JsonProperty
	private String info;

	@JsonProperty
	@Column(name = "min_people")
	private int minPeople;
	@JsonProperty
	@Column(name = "max_people")
	private int maxPeople;

	@JsonProperty
	@Column(name = "min_time")
	private int minTime;
	@JsonProperty
	@Column(name = "max_time")
	private int maxTime;
	@JsonProperty
	private String genre;
	@JsonProperty
	private String image;
	@JsonProperty
	private String youtube;
	@JsonProperty
	private int level;

	@JsonProperty
	@Column(name = "published_year")
	private int publishedYear;

	@Builder
	public Game(int id, int originalId, String name, String info, int minPeople, int maxPeople, int minTime, int maxTime, String genre, String image, String youtube, int level, int publishedYear) {
		this.id = id;
		this.originalId = originalId;
		this.name = name;
		this.info = info;
		this.minPeople = minPeople;
		this.maxPeople = maxPeople;
		this.minTime = minTime;
		this.maxTime = maxTime;
		this.genre = genre;
		this.image = image;
		this.youtube = youtube;
		this.level = level;
		this.publishedYear = publishedYear;
	}

}
