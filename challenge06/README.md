# Challenge 06

In this challenge, the goal's to create an application using the fundamentals of node (Express). The project was based on a system of personal transactions where the amount can "income” and “outcome” in a bank account where it is possible to know the balance. Thus, it's not possible to "outcome" when it's greater than the total. 

The database connection was made using TypeORM and the database was created using migrations.



## Routes

- [GET] / transactions / : List all transactions created and the balance.

- [POST] / transactions /: Create a new transaction.

- [DELETE] / transactions / :id : Delete transaction by id.

- [POST] / transactions / import : Create some transactions based on the imported csv file.

## Challenges

- [x] - should be able to create a new transaction

- [x] - should create tags when insertin new transactions

- [x] - should create tags when they already exists

- [x] - should be able to list the transactions

- [x] - should not be able to create outcome transaction without a valid balance

- [x] - should be able to delete a transaction

- [x] - should be able to import transactions