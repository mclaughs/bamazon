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
    console.log("===========================================");
    for (var i = 0; i < res.length; i++) {
      item = + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity;
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
      console.log("Item Chosen: " + itemDB);
      console.log("Quantity Chosen: " + orderQTY);
      startOrder();
    });
}
// transaction function;
function startOrder() {

  // console.log('itemDB is: ' + itemDB); // works

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
      console.log("You selected " + orderSummary);
      console.log("Number ordered: " + orderQTY + ".  Let me check our stockroom.");
      completeTransaction();
    });
}
function completeTransaction() {
  if (itemQTY >= orderQTY) {
      console.log("Your total cost is $" + orderCost + ".");
  } else {
    console.log("Insufficient quantity in stock.");
    resetChoice();
  }
}
function resetChoice() {
  inquirer
  .prompt([
    {
      name: "selectAnother",
      type: "confirm",
      message: "Would you like to place another order?"
    }
  ])
  .then(function (answer) {
      
      if (answer.selectAnother === true ) {
        console.log("Sure.");
      }
      else {
        console.log("No, thanks.");
      }
  })

} 
    
//   connection.query(
//     "SELECT * FROM products WHERE ?",
//     {
//       item_id: itemDB
//     },
//     function (err, res) {
//       if (err) throw err;
//       var i = itemDB - 1;
//       console.log("Item index: " + i);
//       console.log("You have just purchased:" + res);
//       console.log(res.item_id + " | " + res.product_name + " | " + res.department_name + " | " + res.price + " | " + res.stock_quantity);
//       // console.log(item_id + " | " + product_name + " | " + department_name + " | " + price + " | " + stock_quantity);
//     }
//   )
// }
  // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "itemChoice",
//         type: "input",
//         message: "What is the item you would like to purchase?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What is the quantity you would like to purchase?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid,
//           highest_bid: answer.startingBid
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }