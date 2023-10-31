const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const PORT = process.env.PORT || 3001;

const db = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Sharks12$",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

db.connect((err) => {
  if (err) throw err;
  init();
});

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "starter",
      messages: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employees",
        "Update Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    })
    .then((res) => {
      if (res.starter === "View All Employees") {
        viewEmployees(res);
      } else if (res.starter === "Add Employees") {
        addEmployees(res);
      } else if (res.starter === "Update Employee") {
        updateEmployees(res);
      } else if (res.starter === "View All Roles") {
        viewRoles(res);
      } else if (res.starter === "Add Role") {
        addRole(res);
      } else if (res.starter === "View All Departments") {
        viewDepartments(res);
      } else if (res.starter === "Add Department") {
        addDepartments(res);
      } else {
        console.log("See you next time!");
        process.exit();
      }
    });
}

function viewEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (req, res) => {
    console.table(res);
    init();
  });
}
function addEmployees() {
  db.query("SELECT id, title FROM role", (req, result) => {
    const findRoles = result.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    db.query(
      'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
      (req, result) => {
        const managers = result.map(({ id, name }) => ({
          name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employee's first name",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "role",
              message: "What is the role of the employee?",
              choices: findRoles,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is their manager",
              choices: [{ name: "Is a Manager", value: null }, ...managers],
            },
          ])
          .then((data) => {
            const query =
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            const values = [
              data.first_name,
              data.last_name,
              data.role,
              data.manager,
            ];
            db.query(query, values, (res) => {
              console.log("New employee added");
              init();
            });
          });
      }
    );
  });
}
function updateEmployees() {
  db.query(`SELECT * FROM employee`, (err, res) => {
    db.query(`SELECT * FROM role`, (err, resTwo) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "please select the employee.",
            choices: res.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
          },
          {
            type: "list",
            name: "role",
            message: "Please select the NEW role.",
            choices: resTwo.map((role) => role.title),
          },
        ])
        .then((data) => {
          db.query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [
              resTwo.find((role) => role.title === data.role).id,
              res.find(
                (employee) =>
                  `${employee.first_name} ${employee.last_name}` ===
                  data.employee
              ).id,
            ],
            (err, res) => {
              console.log("Employee role has been updated");
              init();
            }
          );
        });
    });
  });
}
function viewRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (req, res) => {
    console.table(res);
  });
  init();
}
function addRole() {
    const query = "SELECT * FROM department";
  db.query(query, (req, res) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the new role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for the new role?",
          },
          {
            type: "list",
            name: "department",
            message: "Which department is the new role in?",
            choices: res.map((department) => department.name),
          },
        ])
        .then((data) => {
          const department = res.find(
            (department) => department.name === data.department
          );
          const query = "INSERT INTO role SET ?";
          db.query(
            query,
            {
              title: data.title,
              salary: data.salary,
              department_id: department.id,
            },
            (req, res) => {
              console.log(
                `New role created!`
              );
              init();
            }
          );
        });
    });
}
function viewDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (req, res) => {
    console.table(res);
  });
  init();
}
function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new department?",
      },
    ])
    .then((res) => {
      const query = `INSERT INTO department (name) VALUES ("${res.name}")`;
      db.query(query, res);
      console.log(`New department added!`);
      init();
    });
}
