create database if not exists timeline;
use timeline;
drop table if exists account;
drop table if exists message;
create table account (
username varchar(30) binary not null ,
password varchar(50),
primary key (username)
);
create table message (
username varchar(30) ,
time char(13) ,
content text ,
picture text
);