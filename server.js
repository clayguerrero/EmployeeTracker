const inquirer = require("inquirer");
const mysql2 = require("mysql2");

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

function viewEmployees(res) {
  console.log(`You Chose`, res.starter);
}
function addEmployees(res) {
  console.log(`You Chose`, res.starter);
}
function updateEmplyees(res) {
  console.log(`You Chose`, res.starter);
}
function viewRoles(res) {
  console.log(`You Chose`, res.starter);
}
function addRoles(res) {
  console.log(`You Chose`, res.starter);
}
function viewDepartments(res) {
  console.log(`You Chose`, res.starter);
}
function addDepartments(res) {
  console.log(`You Chose`, res.starter);
}

init();
