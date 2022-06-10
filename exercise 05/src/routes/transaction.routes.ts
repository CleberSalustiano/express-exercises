import { Router } from 'express';
import { v4 } from 'uuid';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
transactionRouter.get('/', (request, response) => {
  try {
    const data = transactionsRepository.all();

    response.json(data);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type }: Transaction = request.body;
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const {total} = transactionsRepository.getBalance();

    if (type !== 'income' && type !== 'outcome') {
      throw Error('This transaction is not correct.');
    }


    if (type === 'outcome' && total < value){
      throw Error('This transaction is not valid because the value is higher than available')
    }

    const transaction = createTransaction.execute({
      id: v4(),
      title,
      value,
      type,
    });

    response.json(transaction);
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
