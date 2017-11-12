var mysql = require("mysql");
var inquirer = require("inquirer");
var item = "";
var orderSummary = "";
var orderCost = "";
var itemDB = 0;
var orderQTY = 0;
var itemQTY = 0;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "steve",

  // Your password
  password: "nymets",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  displayProducts();
  //  start();
});

function displayProducts() {
  // console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("Wecome to Bamazon.");
    console.log("These Are Our Products.")
    console.log("ID" + "| " + "PRODUCT     " + " | " + "DEPARTMENT " + " | " + "PRICE" + "| " + "QTY");
    console.log("===========================================\n");
    for (var i = 0; i < res.length; i++) {
      item = + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n";
      console.log(item);
    }
    startItem();
  });
}

// function which prompts the user for what action they should take
function startItem() {
  inquirer
    .prompt([
      {
        name: "itemChoice",
        type: "input",
        message: "Please enter the ID of the product you would like to buy.",
      },
      {
        name: "orderQuantity",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function (answer) {
      // log user's answers to query/update with database
      itemDB = answer.itemChoice;
      orderQTY = answer.orderQuantity;
      startOrder();
    });
}
// transaction function;
function startOrder() {

  connection.query('select * from products WHERE ?',
    [
      {
        item_id: itemDB
      }
    ], function (err, res) {

      if (err) throw err;
      orderSummary = res[0].product_name + " from our " + res[0].department_name + " department.  Each costs $" + res[0].price + ".";
      itemQTY = res[0].stock_quantity;
      // console.log(itemQTY);
      orderCost = orderQTY * res[0].price;
      console.log("\nYou selected " + orderSummary);
      console.log("Number ordered: " + orderQTY + ".  Let me check our stockroom.");
      completeTransaction();
    });
}
function completeTransaction() {
  if (itemQTY >= orderQTY) {
    updateDB();
  } 
  else {
    console.log("\nInsufficient quantity in stock.");
    resetChoice();
  }
}
function updateDB() {
  itemQTY = itemQTY - orderQTY;
  // console.log("Item quantity is now: " + itemQTY);
  connection.query("update products set ? where ?",
    [
      {
        stock_quantity: itemQTY
      },
      {
        item_id: itemDB
      }
    ], function (err, res) {

      if (err) throw err;
      console.log("\n" + res.affectedRows + " item in the catalog has been updated to reflect your order.");
      console.log("Your total cost is $" + orderCost + ".");
      resetChoice();
    });
}
function resetChoice() {
  inquirer
    .prompt([
      {
        name: "selectAnother",
        type: "confirm",
        message: "\nWould you like to place another order?\n"
      }
    ])
    .then(function (answer) {

      if (answer.selectAnother === true) {
        startItem();
      }
      else {
        console.log("Goodbye.");
        connection.end();
      }
    })
} 
