create database cocktail_menu_db;
use cocktail_menu_db;

create table cocktail(
id int auto_increment primary key,
nombre varchar (50) not null,
ingredientes varchar (255) not null,
preparacion text,
);