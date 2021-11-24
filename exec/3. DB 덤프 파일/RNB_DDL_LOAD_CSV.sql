use rnb;

CREATE TABLE `recruitment` (
	`recruitment_id`	INT	NOT NULL AUTO_INCREMENT	PRIMARY KEY	COMMENT 'AI',
	`user_id`			VARCHAR(255) NOT NULL COMMENT 'UUID 처리',
	`title`				VARCHAR(255) NOT NULL COMMENT '구인글 제목',
	`content`			TEXT COMMENT '내용',
	`max_participant`	INT	NOT NULL DEFAULT 4 COMMENT '모집인원수',
	`now_participant`	INT	DEFAULT 1 COMMENT '현재인원수',
	`date`				TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '모이는 날짜(ex. 2021-10-05)',
	`place`				VARCHAR(255) COMMENT '모이는 지역명(서울특별시 동작구)',
	`complete`			TINYINT	DEFAULT 0 COMMENT '모집 완료 여부'
);


CREATE TABLE `player` (
	`player_id`			INT	NOT NULL AUTO_INCREMENT	PRIMARY KEY	COMMENT 'AI',
	`recruitment_id`	INT	NOT NULL,
	`user_id`			VARCHAR(255) NOT NULL,
	`is_host`			TINYINT	NOT NULL DEFAULT 0 COMMENT '0:게스트, 1:호스트'
);


CREATE TABLE `game` (
	`id`	INT	NOT NULL 	COMMENT 'AI',
	`original_id`	INT	NOT NULL primary key	COMMENT 'Data 상의 원래 ID',
	`name`	varchar(255)	,
	`info`	TEXT	,
	`min_people`	INT	,
	`max_people`	INT	,
	`min_time`	INT		COMMENT '분단위',
	`max_time`	INT	,
	`genre`	varchar(255)		COMMENT '장르1,장르2,장르3',
	`image`	varchar(255)		COMMENT '썸네일 이미지 링크',
	`youtube`	varchar(255)		COMMENT '소개 유튜브 링크',
	`published_year` INT,
	`level`	INT	NULL default 0
);

CREATE TABLE `review` (
	`review_id`	INT	NOT NULL auto_increment primary key	COMMENT 'AI',
	`user_id`	VARCHAR(50)	NOT NULL	COMMENT 'UUID 처리',
	`game_id`	INT	NOT NULL,
	`content`	TEXT	NULL,
	`rating`	double	NOT NULL	COMMENT '0~5(0.5)'
);

CREATE TABLE `like` (
	`like_id`	INT	NOT NULL auto_increment primary key	COMMENT 'AI',
	`user_id`	VARCHAR(50)	NOT NULL,
	`game_id`	INT	NOT NULL
);

CREATE TABLE `have` (
	`have_id`	INT	NOT NULL auto_increment primary key	COMMENT 'AI',
	`user_id`	VARCHAR(50)	NOT NULL	COMMENT 'UUID 처리',
	`game_id`	INT	NOT NULL
);

CREATE TABLE `user` (
	`user_id`	VARCHAR(50)	NOT NULL primary key	COMMENT 'UUID 처리',
	`email`	VARCHAR(255)	NOT NULL	COMMENT '로그인할때 ID가 되는 이메일',
	`password`	VARCHAR(255)	NULL	COMMENT '암호화 적용(ex. SHA256), 소셜 로그인 시 Null',
	`nickname`	VARCHAR(255)	NOT NULL	COMMENT '중복 불가',
	`sns`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '소셜 로그인으로 가입 여부',
	`type`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0: 일반회원, 1: 관리자',
	`profile_img`	VARCHAR(255)	NOT NULL	COMMENT '기본 이미지 설정. Firebase URL',
	`popularity`	INT	NOT NULL	DEFAULT 0	COMMENT '인기도 수정 -> redis'
);

CREATE TABLE `genre_counts` (
	`genre`	varchar(255) primary key,
	`counts` int
);

ALTER TABLE `recruitment` ADD CONSTRAINT `FK_user_TO_recruiment`
FOREIGN KEY (`user_id`)
REFERENCES `user`(`user_id`) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `player` ADD CONSTRAINT `FK_recruiment_TO_player`
FOREIGN KEY (`recruitment_id`)
REFERENCES `recruitment`(`recruitment_id`) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE `player` ADD CONSTRAINT `FK_user_TO_player`
FOREIGN KEY (`user_id`)
REFERENCES `user`(`user_id`) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `review` ADD CONSTRAINT `FK_user_TO_review`
FOREIGN KEY (`user_id`)
REFERENCES `user`(`user_id`) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE `review` ADD CONSTRAINT `FK_game_TO_review`
FOREIGN KEY (`game_id`)
REFERENCES `game`(`original_id`) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `like` ADD CONSTRAINT `FK_user_TO_like`
FOREIGN KEY (`user_id`)
REFERENCES `user`(`user_id`) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE `like` ADD CONSTRAINT `FK_game_TO_like`
FOREIGN KEY (`game_id`)
REFERENCES `game`(`original_id`) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `have` ADD CONSTRAINT `FK_user_TO_have`
FOREIGN KEY (`user_id`)
REFERENCES `user`(`user_id`) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE `have` ADD CONSTRAINT `FK_game_TO_have`
FOREIGN KEY (`game_id`)
REFERENCES `game`(`original_id`) ON UPDATE CASCADE ON DELETE RESTRICT;

LOAD DATA LOCAL INFILE 'C:/dump.csv'
REPLACE INTO TABLE `rnb`.`game`
COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n' IGNORE 1 LINES
(@id, @original_id, @name, @info, @yearpublished, @min_people, @max_people, @min_time, @max_time, @genre, @image)
SET `id` = @id, `original_id` = @original_id, `name` = @name,
`info` = @info, `published_year` = @yearpublished, `min_people` = @min_people, `max_people` = @max_people, `min_time` = @min_time,
`max_time` = @max_time, `genre` = @genre, `image` = @image;

LOAD DATA LOCAL INFILE 'C:/genre_counts.csv'
REPLACE INTO TABLE `rnb`.`genre_counts`
COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n' IGNORE 1 LINES
(@genre, @counts)
SET `genre` = @genre, `counts` = @counts;


