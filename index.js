const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'employee_db'
});

connection.connect(function(err) {
  if (err) throw err;
  startOptions();
});
 
function startOptions() {
  inquirer.prompt ({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Departments",
      "Add Roles",
      "Add Employee",
      "Update Employee Role",
      "Exit"
    ]
  })
  .then(function(selection) {
    switch (selection.option) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
        break; 
      case "View All Employees":
        viewEmployees();
        break;      
      case "Add Departments":
        addDepartments();
        break;    
      case "Add Roles":
        addRoles();
        break;
      case "Add Employees":
        addEmployees();
        break;      
      case "Update Employee Roles":
        updateRoles();
        break;    
      case "Exit":
        connection.end();
    }
  });
};

function viewDepartments() {
  connection.query('SELECT * FROM departments;', function (err, res) {
    if (err) throw err;
    console.table(res);
    startOptions();
  })
};

function viewRoles() {
  connection.query('SELECT * FROM roles;', function (err, res) {
    if (err) throw err;
    console.table(res);
    startOptions();
  })
};

function viewEmployees() {
  connection.query('SELECT * FROM employees;', function (err, res) {
    if (err) throw err;
    console.table(res);
    startOptions();
  })
};

function addDepartments() {
  //connection.query('SELECT * FROM employees;', function (err, res) {
  //  if (err) throw err;
  //  console.table(res);
  console.log("add department");
  startOptions();
  //})
};

function addRoles() {
  //connection.query('SELECT * FROM employees;', function (err, res) {
  //  if (err) throw err;
  //  console.table(res);
  console.log("add roles");
  startOptions();
  //})
};

function addEmployees() {
  //connection.query('SELECT * FROM employees;', function (err, res) {
  //  if (err) throw err;
  //  console.table(res);
  console.log("add employee");
  startOptions();
  //})
};

function updateRoles() {
  //connection.query('SELECT * FROM employees;', function (err, res) {
  //  if (err) throw err;
  //  console.table(res);
  console.log("update roles");
  startOptions();
  //})
};