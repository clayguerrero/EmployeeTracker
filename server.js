const inquirer = require("inquirer");
const mysql2 = require("mysql2");

function init() {
  inquirer.createPromptModule({
    type: "list",
    name: "starter",
    messages: "What would you like to do?",
    choices: [
      "View All departments",
      "Add Employees",
      "Update Employee",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "View All Employees",
      "Quit",
    ],
  });
}
