create database crm;

    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    create type user_role as enum('director','superadmin','teamlead', 'user','defaultUser');

        create table users(
        user_id uuid primary key DEFAULT uuid_generate_v4() null,
        userg_id text,
        user_name varchar(255) not null,
        user_email varchar(64) not null unique,
        user_password varchar(64),
        user_role  user_role default 'defaultUser' not null,
        user_created_at timestamp default current_timestamp,
        user_updated_at timestamp default null,
        user_isDelete BOOLEAN NOT NULL DEFAULT FALSE
        );       

    insert into users(
        user_name,
        user_email,
        user_password,
        user_role
    )values(
        'avant',
        'avantadmin@gmail.com',
        '$2a$12$trCBy2mCaeIOHhEQ81zV9OuBuo24eRBaDvDesMM.FHhOqfpd6kRKa',
        'superadmin'
    );
-- create table tasks(
--     tasks_id serial primary key not null,
--     tasks_count int not null
-- )
-------------------------------------------------------------------------
create table task(
    task_id uuid primary key DEFAULT uuid_generate_v4() null,
    task_title varchar(64) not null,
    task_desc text not null,
    created_at timestamp default current_timestamp,
    start_t int not null,
    end_t int not null,
    user_id uuid,
    foreign key(user_id)
    references users(user_id)
    oN DELETE SET NULL
);
CREATE TABLE task (
    task_id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NULL,
    task_title varchar(64) NOT NULL,
    task_desc text NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    start_t int NOT NULL,
    end_t int NOT NULL,
    user_id uuid,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
------------------------------------------------------------------------------------------------
create table todo_def_u(
    todo_id uuid primary key DEFAULT uuid_generate_v4() null,
    todo_title varchar(32) not null,
    todo_desc text not null,
    created_at timestamp default current_timestamp,
    ended_at int not null,
    user_id int not null,
    foreign key(user_id)
    references users(user_id)
);
CREATE TABLE todo_def_u (
    todo_id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NULL,
    todo_title varchar(32) NOT NULL,
    todo_desc text NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    ended_at int NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
----------------------------------------------------------------------------------------------------------------


-- create table user_add_todo(
--  add_todo_id serial primary key  not null,
--  todo_id int not null,
--  user_id int not null,
--  foreign key(user_id)
--  references users(user_id),
--  foreign key(todo_id)
--  references todo_def_u(todo_id)
-- )









-- insert into task(
--     task_title,
--     task_desc,
--     start_t,
--     end_t,
--     user_id
-- )values(
--     'Baluuu',
--     'Balue togen nima gap',
--      12,
--      13
-- );

-- create table all_tasks(
--     allts_id serial primary key not null,
--     task_id int  not null,
--     tasks_id int not null,
--     foreign key(task_id),
--     references task(task_id) on delete set null,
--     foreign key(tasks_id)
--     references tasks(tasks_id) on delete set null
    
-- )




















































CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(64)
);
CREATE TABLE product(
    user_id INT,
    product_id SERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(64),
    product_price INT,
    product_count INT,
      FOREIGN KEY(user_id)
        REFERENCES users(user_id)
           ON DELETE SET NULL
);




INSERT INTO users(user_name)VALUES('SANJAR'),('VALIJON'),('MIRABROR'),('JAVOHIR'),('NODIR');
INSERT INTO product(product_name, product_price, product_count, user_id)
VALUES('SUT', 20000, 500, 5),
('QATIQ', 14000, 750, 1),
('MOLOKO', 24000, 10, 3),
('COLA', 4000, 1000, 2),
('MOLOKO', 27000, 1120, 4);
SELECT f.user_name, t.product_name, t.product_price, t.product_price from users as f INNER JOIN product as t ON f.user_id=t.user_id;
SELECT * from users as f INNER JOIN product ON f.user_id=product.user_id;
SELECT * from product;
SELECT * from users;