const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const PORT = process.env.PORT || 3001;

const db = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
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
      } else if (res.starter === "Update Employees") {
        updateEmplyees(res);
      } else if (res.starter === "View All Roles") {
        viewRoles(res);
      } else if (res.starter === "Add Role") {
        addRoles(res);
      } else if (res.starter === "View All Departments") {
        viewDepartments(res);
      } else if (res.starter === "Add Department") {
        addDepartments(res);
      } else console.log("See you next time!");
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
  const query = "SELECT id, title, FROM role";
  // db.query(query, (req, res) => {
  //   console.log
  // })
}
function updateEmplyees(res) {
  console.log(`You Chose`, res.starter);
}
function viewRoles(res) {
  const query = "SELECT * FROM role";
  db.query(query, (req, res) => {
    console.table(res);
  });
  init();
}
function addRoles() {
  const query = "SELECT * FROM department";
  db.query(query, (req, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Please select the department with this role.",
          choices: res.map((department) => department.name),
        },
      ])
      .then((data) => {
        const query = "INSERT INTO role SET ?";
        const department = res.find(
          (department) => department.name === res.department
        );
        db.query(
          query,
          {
            title: data.title,
            salary: data.salary,
            department_id: department,
          },
          console.log(`New role has been added.`)
        );
        init();
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
function addDepartments(res) {
  console.log(`You Chose`, res.starter);
}
