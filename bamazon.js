var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  load();
});

function load() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);

    form(res);
  });
}

function form(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "what is the ID of the product that you'd like to check out? go back please type 'Q'",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      check(val.choice);
      var choice = parseInt(val.choice);
      var product = checkInventory(choice, inventory);

      if (product) {
        quantity(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        load();
      }
    });
}

function quantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "What is your prefered quantity? go back please type 'Q'",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      check(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nSorry, we don't have that many items in stock now :(!");
        load();
      }
      else {
        purchase(product, quantity);
      }
    });
}

function purchase(product, quantity) {
  connection.query(
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nOrder Placed: " + quantity + " " + product.product_name + "s!");
      load();
    }
  );
}

function checkInventory(choice, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choice) {
      return inventory[i];
    }
  }
  return null;
}

function check(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Thank you for visiting!");
    process.exit(0);
  }
}
