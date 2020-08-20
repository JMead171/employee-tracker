DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
  id INTEGER(5) AUTO_INCREMENT NOT NULL,
  dep_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INTEGER(5) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(8,2),
  department_id INTEGER(5),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)

);

CREATE TABLE employees (
  id INTEGER(5) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER(5),
  manager_id INTEGER(5),
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)

);