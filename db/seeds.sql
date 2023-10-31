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
('Manager', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Christian', 'C', 1, null),
('Clay', 'G', 2, null),
('Chuck', 'R', 3, 3);
