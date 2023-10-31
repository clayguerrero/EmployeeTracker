USE employee_db;

INSERT INTO department(name)
VALUES
('Service'),
('ECommerce'),
('Grocery');

INSERT INTO role (title, salary, department_id)
VALUES
('Cashier', 18000, 1),
('Shopper', 22000, 2),
('Manager', 80000, 3),
('Curbie', 15000, 2),
('Bagger', 15000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Carlos', 'R', 3, NULL),
('Ashley', 'B', 3, NULL),
('Christian', 'C', 1, 1),
('Clay', 'G', 2, 2),
('Chuck', 'R', 3, NULL);
