# bamazon
Welcome to Bamazon.  This short document will describe how our application is used to make purchases.

**bamazonCustomer.js**

This application is opened by entering *node bamazonCustomer.js* on the command line.

The customer is greeted with 12 items in our current inventory and asked which item she would like to purchase. In this case item id 12 is entered.

bamazonCustomer-1

Once the id of the desired product is selected the customer is asked the quantity she would like to purchase.  Note that she has selected 4 of the item "gps" (last in the table) where only 3 are available in the stockroom.

bamazonCustomer-2

The customer is informed that there is insufficient quantity in stock and offered the opportunity to place another order.  If she says no the program ends (demonstrated below).  In this case she has entered 'Y' to place another order.

bamazonCustomer-3

She is now reprompted with the offer to select an item id for purchase.  She is then reprompted with the quantity she would like to order.  This time she has decided to buy only 2 gps.

bamazonCustomer-4

The customer is now shown the results of her order.  The total cost reflects the item's cost ($300) times the quantity ordered ($600).  This time she selects N when asked if she would like to place another order and the program terminates.

bamazonCustomer-5

The next customer is shown the catalog screen upon sign-on.  Note the quantity of GPS remaining is now 1 reflecting the previous order.

bamazonCustomer-6.

**bamazonManager.js**

This future enhancement will enable the manager to scan current inventory for items which need to be reordered.

**bamazonCustomer.js**

This future enhancement will enable the supervisor to analyze profit and loss by department.