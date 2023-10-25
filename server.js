const inquirer = require("inquirer");
const mysql2 = require("mysql2");

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "starter",
      messages: "What would you like to do?",
      choices: [
        "View All Departments",
        "Add Employees",
        "Update Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "View All Employees",
        "Quit",
      ],
    })
    .then((res) => {
        if (res.starter === 'View All Departments') {
            console.log(`You Chose`, res.starter);
        }
        else console.log('Error LUL')
    });
}

init();
