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
        console.log(`You Chose`, res.starter);
      }
      else if (res.starter === "Add Employees") {
        console.log(`You Chose`, res.starter);
      }
      else if (res.starter === "Update Employees") {
        console.log(`You Chose`, res.starter);
      }
      else if (res.starter === "View All Roles") {
        console.log(`You Chose`, res.starter);
      }
      else if (res.starter === "Add Role") {
        console.log(`You Chose`, res.starter);
      }
      else if (res.starter === "View All Departments") {
        console.log(`You Chose`, res.starter);
      }
      else if (res.starter === "Add Departments") {
        console.log(`You Chose`, res.starter);
      } else console.log('See you next time!')
    });
}

init();
