# Challenge 05

In this challenge, the goal's to create an application using the fundamentals of node (Express). The project was based on a system of personal transactions where the amount can "income” and “outcome” in a bank account where it is possible to know the balance. Thus, it's not possible to "outcome" when it's greater than the total. It doesn't have connection with database

## Routes

- [GET] / transactions / : List all transactions created and the balance.

- [POST] / transactions /: Create a new transaction.

## Challenges

- [x] - should be able to create a new transaction

- [x] - should be able to list the transactions

- [x] - should not be able to create outcome transaction without a valid balance
