CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author text,
	url text NOT NULL,
	title text NOT NULL,
	likes integer DEFAULT 0
);

insert into blogs (url, title) values ('www.google.com', 'Google');
insert into blogs (author, url, title, likes) values ('Marc Bäckman', 'www.fullstackopen.com', 'Full Stack Open course', 10);