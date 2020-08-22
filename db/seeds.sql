USE employee_db;

INSERT INTO departments (dep_name)
VALUES 
("Human Resources"),
("IT"),
("Sales"),
("Accounting"),
("Customer Service"),
("Marketing"),
("Payroll");

INSERT INTO roles (title, salary, department_id)
VALUES
("PR Manager",55000,6),
("IT Manager",65000,2),
("Database Admin",65000,2),
("Benefits Manager",60000,1),
("Director of Sales",115000,3),
("Accounts Receivable Analyst",60000,4),
("Accounts Payable Analyst",60000,4),
("Legal Compliance",80000,1),
("Senior Accountant",90000,4),
("Service Assoc.",55000,5),
("Full Stack Developer",90000, 2),
("Ad Designer", 40000, 6),
("Clerk",35000,7),
("Payroll Admin",60000,7); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith",9,null),
("Linda","Marra",2,null),
("Alan", "Wright",11,1),
("Kevin","Reilly",8,1),
("Mary", "Kregger",5,2),
("Robert","Milton",14,2),
("Mike","Jacobs",12,5);