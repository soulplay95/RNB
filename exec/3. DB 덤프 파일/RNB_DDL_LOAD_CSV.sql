use rnb;

CREATE TABLE `recruitment` (
	`recruitment_id`	INT	NOT NULL AUTO_INCREMENT	PRIMARY KEY	COMMENT 'AI',
	`user_id`			VARCHAR(255) NOT NULL COMMENT 'UUID ó��',
	`title`				VARCHAR(255) NOT NULL COMMENT '���α� ����',
	`content`			TEXT COMMENT '����',
	`max_participant`	INT	NOT NULL DEFAULT 4 COMMENT '�����ο���',
	`now_participant`	INT	DEFAULT 1 COMMENT '�����ο���',
	`date`				TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '���̴� ��¥(ex. 2021-10-05)',
	`place`				VARCHAR(255) COMMENT '���̴� ������(����Ư���� ���۱�)',
	`complete`			TINYINT	DEFAULT 0 COMMENT '���� �Ϸ� ����'
);


CREATE TABLE `player` (
	`player_id`			INT	NOT NULL AUTO_INCREMENT	PRIMARY KEY	COMMENT 'AI',
	`recruitment_id`	INT	NOT NULL,
	`user_id`			VARCHAR(255) NOT NULL,
	`is_host`			TINYINT	NOT NULL DEFAULT 0 COMMENT '0:�Խ�Ʈ, 1:ȣ��Ʈ'
);


CREATE TABLE `game` (
	`id`	INT	NOT NULL 	COMMENT 'AI',
	`original_id`	INT	NOT NULL primary key	COMMENT 'Data ���� ���� ID',
	`name`	varchar(255)	,
	`info`	TEXT	,
	`min_people`	INT	,
	`max_people`	INT	,
	`min_time`	INT		COMMENT '�д���',
	`max_time`	INT	,
	`genre`	varchar(255)		COMMENT '�帣1,�帣2,�帣3',
	`image`	varchar(255)		COMMENT '����� �̹��� ��ũ',
	`youtube`	varchar(255)		COMMENT '�Ұ� ��Ʃ�� ��ũ',
	`published_year` INT,
	`level`	INT	NULL default 0
);

CREATE TABLE `review` (
	`review_id`	INT	NOT NULL auto_increment primary key	COMMENT 'AI',
	`user_id`	VARCHAR(50)	NOT NULL	COMMENT 'UUID ó��',
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
	`user_id`	VARCHAR(50)	NOT NULL	COMMENT 'UUID ó��',
	`game_id`	INT	NOT NULL
);

CREATE TABLE `user` (
	`user_id`	VARCHAR(50)	NOT NULL primary key	COMMENT 'UUID ó��',
	`email`	VARCHAR(255)	NOT NULL	COMMENT '�α����Ҷ� ID�� �Ǵ� �̸���',
	`password`	VARCHAR(255)	NULL	COMMENT '��ȣȭ ����(ex. SHA256), �Ҽ� �α��� �� Null',
	`nickname`	VARCHAR(255)	NOT NULL	COMMENT '�ߺ� �Ұ�',
	`sns`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '�Ҽ� �α������� ���� ����',
	`type`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0: �Ϲ�ȸ��, 1: ������',
	`profile_img`	VARCHAR(255)	NOT NULL	COMMENT '�⺻ �̹��� ����. Firebase URL',
	`popularity`	INT	NOT NULL	DEFAULT 0	COMMENT '�α⵵ ���� -> redis'
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


