const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

let employeeList = [];
let employeeListId = {};
let updateId = 0;

let connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'employee_db'
});

connection.connect(function(err) {
  if (err) throw err;
  getEmployees();
  startOptions();
});
 

function getEmployees() {
  connection.query('SELECT employees.id, employees.first_name, employees.last_name FROM employees;',
  function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      employeeList.push(res[i].first_name + " " + res[i].last_name);
    }
    employeeListId = res;
  })
};

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
      "Add Employees",
      "Update Employee Roles",
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
  connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.dep_name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
  FROM employees e
  LEFT JOIN roles r ON r.id = e.role_id
  LEFT JOIN departments d ON r.department_id = d.id
  LEFT JOIN employees m  ON m.id = e.manager_id;`,
  function (err, res) {
    if (err) throw err;
    console.table(res);
    startOptions();
  })
};

function addDepartments() {
  inquirer.prompt ({
    type: "input",
    name: "department",
    message: "What department would you like to add?"
    })
    .then(function(res) {
      let displayRole = res.department;
      connection.query(`INSERT INTO departments SET ?`,
      {
        dep_name: res.department
      },
       function(err, res) {
        if (err) throw err;
        console.log(displayRole, "was added to the database");
        startOptions();
      })
    })
};

function addRoles() {
  inquirer.prompt ([
    {
    type: "input",
    name: "role",
    message: "What role would you like to add?"
    },
    {
    type: "number",
    name: "salary",
    message: "Please enter a salary?"
    },
    {
    type: "number",
    name: "id",
    message: "Please enter department ID?"
    }])
    .then(function(res) {
      let displayRole = res.role;
      connection.query(`INSERT INTO roles SET ?`,
      [{
        title: res.role,
        salary: res.salary,
        department_id: res.id
      }],
      function(err, res) {
        if (err) throw err;
        console.log(displayRole, "was added to the database");
        startOptions();
      })
    })
};

function addEmployees() {
  inquirer.prompt ([
    {
    type: "input",
    name: "first",
    message: "What is the employee's first name?"
    },
    {
    type: "input",
    name: "last",
    message: "What is the employee's last name?"
    },
    {
      type: "number",
      name: "role",
      message: "Please enter a role id?"
      },
    {
    type: "number",
    name: "manager",
    message: "Please enter a manager id?"
    }])
    .then(function(res) {
      let displayEmp = res.first + " " + res.last;
      connection.query(`INSERT INTO employees SET ?`,
      [{
        first_name: res.first,
        last_name: res.last,
        role_id: res.role,
        manager_id: res.manager
      }],
      function(err, res) {
        if (err) throw err;
        console.log(displayEmp, "was added to the database");
        startOptions();
      })
    })
};

function updateRoles() {
  inquirer.prompt ([
    {
      type: "list",
      name: "option",
      message: "Which employee would you like to update?",
      choices: employeeList 
    },
    {
      type: "number",
      name: "role",
      message: "Please enter their new role?"
    }])
    .then(function(res) {
      let selectedId = res.option.split(" ");
      let displayEmp = res.option;
      for (let i = 0; i < employeeListId.length; i++) {
        if (employeeListId[i].first_name === selectedId[0] && employeeListId[i].last_name === selectedId[1]) {
            updateId = employeeListId[i].id
        }
      }
      connection.query('UPDATE employees SET ? WHERE ?',
        [
        {role_id: res.role},
        {id: updateId}
        ],
        function(err, res) {
          if (err) throw err;
          console.log(displayEmp, "was updated in the database");
          startOptions();
        })
    })
};