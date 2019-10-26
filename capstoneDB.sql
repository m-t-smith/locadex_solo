-- creates database
CREATE DATABASE `uncg_buildings`;
-- creates tables buildings, faculty, courses, and utilities
CREATE TABLE `buildings` (
	`building_id` numeric(3) NOT NULL,
    `building_name` varchar(50) NOT NULL,
    `building_history` varchar(400),
    primary key(building_id) 
);
CREATE TABLE `faculty` (
	`name` varchar(20) NOT NULL,
    `building_id` numeric(3) NOT NULL,
    `room_number` numeric(3),
    primary key(name),
    foreign key(building_id) references buildings(building_id)
);
CREATE TABLE `courses` (
	`building_id` numeric(3) NOT NULL,
    `course_category` varchar(30),
    `course_number` int,
    `room_number` int,
    foreign key(building_id) references buildings(building_id)
);
CREATE TABLE `utilities` (
	`building_id` numeric(3) NOT NULL,
    `utilities` varchar(30),
    foreign key(building_id) references buildings(building_id)
);
-- inserts values into building, courses, faculty, and utilities tables
INSERT INTO buildings(building_id,building_name, building_history) VALUES 
	(1, 'Petty','Built in 1940.  Initially known as the science building from 1940 to 1960.  
    In 1960 the building was named Petty after Mary Macy Petty, head of the chemistry department from 1893 to 1934.'),
    (2, 'Elliot University Center', 'Opened on March 1, 1953 and initially called Elliot Hall. In 1968, expanded to
    provide more facilities for students. Became known as EUC in 1974.  Bookstore and food court were added in 2001.
    Connected to Jackson Library in 2006. Named after Harriot Elliot, initially an instructor starting in 1913 and 
    eventually becoming dean in 1935.'),
    (3, 'Curry','The Curry Building was named in honor of Jabez Lamar Monroe Curry who advocated for the establishment
    of UNCG in the early 1890s.'),
    (4, 'School of Education','Designed by O’Brien/Atkins Associates of Durham/NC and opened in spring 2011.  It is also
    the first building on campus built to the LEED Silver standards.'),
    (5, 'Bryan','Originally called the Business and Economics Building and was opened in 1980.  In 1989 the building was
    named after Joseph McKinley Bryan, a businessman and philanthropist in Greensboro, NC.'),
    (6, 'Moore','Originally called Nursing Education Building and opened in 1976.  Named after Margaret Catherine Moore,
    who was a member of the original faculty of the School of Nursing and chair of the building committee.'),
    (7, 'Gatewood Studio Arts','Opened in 2006 and named in memory of Maud Florence Gatewood, a nationally known artist.'),
    (8, 'Jackson Library','Opened in 1950 and named after Walter Clinton Jackson in 1960.  Walter Clinton was a professor,
    author, and chancellor from 1934-1950.  The tower addition opened in 1973.'),
    (9, 'Stone','The building consists of two wings and the back wing was opened in 1928 and was initially called the Home
    Economics Building.  The front wing was added in 1951.  In 1956 both wings were named after Mary Frances Stone, who died
    in an accident 6 months after graduation.'),
    (10, 'Sullivan Science','Originally called the Science Building and was opened in 2003.  In 2008 the building was named
    after Patricia A. Sullivan, chancellor from 1995 to 2008.');

insert into faculty(`name`,building_id, room_number) values
	('Chandana Ariyawansa',1,163),
    ('Mark Armstrong',1,163),
    ('Jing Deng',1,166),
    ('Lixin Fu',1,162),
    ('Nancy Green',1,159),
    ('Sami Khuri',1,156),
    ('Minjeong Kim',1,155),
    ('Regis Kopper',1,160),
    ('Spencer Lee',1,158),
    ('Prashanti Manda',1,164),
    ('Somya Mohanty',1,152),
    ('Fereidoon Sadri',1,204),
    ('Shan Suthaharan',1,161),
    ('Steve Tate',1,157),
    ('Edmundson Effort',1,156);
insert into utilities(building_id, utilities) values
	(1,'Computer Labs'),
    (1,'CS Tutor Center'),
    (1,'ACM/Infosec Club Meetings');
insert into courses(building_id,course_category) values
	(1, 'Computer Science'),
    (1, 'Mathematics'),
    (1, 'Physics'),
    (1, 'Astronomy');
-- displays the tables to check if all the info is inserted correctly
select * from buildings;
select * from faculty;
select * from utilities;
select * from courses;
-- to extract the petty info
-- extract petty history
select building_history
from buildings
where building_id=1;
-- extract petty course types
select course_category
from courses 
where building_id = 1;
-- extract petty faculty office info
select faculty.name, buildings.building_name,faculty.room_number
from faculty
inner join buildings
on faculty.building_id = buildings.building_id;
-- extract petty utilities info
select utilities.utilities 
from utilities 
where building_id=1;