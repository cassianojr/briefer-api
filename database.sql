drop database briefer;
create database briefer;
use briefer;

create table user(
	id_user int primary key auto_increment,
	name varchar(200) not null,
	company varchar(100),
	email varchar(200) not null unique,
	password varchar(255) not null,
	post varchar(100) not null	
);

create table briefing(
	id_briefing int primary key auto_increment,
	cl_name varchar(200) not null,
	cl_phone varchar(14),
	cl_email varchar(200) not null,
	examples varchar(255),
	num_pages int,
	has_visual boolean not null,
	has_logo boolean not null,
	has_current boolean not null,
	description text not null,
	proj_title varchar(200) not null,
	social_media varchar(255),
	outline text not null,
	objective text not null,
	id_user int,
	FOREIGN KEY(id_user) REFERENCES user(id_user)
);

create table budget(
	id_budget int primary key auto_increment,
	time_goal date,
	cost double,
	id_briefing int,
	FOREIGN KEY(id_briefing) REFERENCES briefing(id_briefing)
);

create table feature(
	id_feature int primary key auto_increment,
	name varchar(200)
);

create table briefing_feature(
	id int primary key auto_increment,
	id_briefing int,
	id_feature int,
	FOREIGN KEY(id_briefing) REFERENCES briefing(id_briefing),
	FOREIGN KEY(id_feature) REFERENCES feature(id_feature)
);