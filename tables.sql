DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (

	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,

	product_name VARCHAR(30) NOT NULL,
  
	department_name VARCHAR(30), 
    
    price DECIMAL(10,2) NOT NULL,
    
    stock_quantity INTEGER(11) NOT NULL,
    
	PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("golf clubs", "sporting goods", 250, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skiis", "sporting goods", 375, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycles", "sporting goods", 750, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dish towel set", "household", 14.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dinnerware", "household", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("flatware", "household", 50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tents", "outdoor", 200, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("grills", "outdoor", 300, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cellphones", "electronics", 600, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("televisions", "electronics", 500, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computers", "electronics", 800, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gps", "electronics", 300, 1);

SELECT * from products;