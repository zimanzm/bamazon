DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fancy protein powder", "healthy supplement", 20.99, 20),
  ("baby food for adults", "healthy supplement", 3.99,100),
  ("Spanish truffle-roasted almonds", "hipster snacks", 5.99, 20),
  ("dry-freezed avocado chips", "hipster snacks", 4.39, 15),
  ("hand-made soap", "bath", 11.96, 20),
  ("better-than-lushhy bathbomb", "bath", 20, 100),
  ("greeting card", "stationary", 8.00, 70),
  ("6-pack multi-color gel pen", "stationary", 11.99, 60),
  ("magic card", "fun", 100.00, 1),
  ("poker", "fun", 6.99, 10);
