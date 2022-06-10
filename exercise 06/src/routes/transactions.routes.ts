import { Router } from 'express';
import Transaction from '../models/Transaction';
import { v4 } from 'uuid';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import { getRepository } from 'typeorm';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getRepository(TransactionsRepository);

  const transactions = transactionsRepository.find();

  return transactions;
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category_id }: Transaction = request.body;
    
    if (type !== 'income' && type !== 'outcome') {
      throw Error('This transaction is not correct.');
    }

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      id: v4(),
      title,
      value,
      type,
      category_id
    });

    response.json(transaction);
    return response.json(transaction);
  } catch (err) {
    if (err instanceof Error){
      return response.status(400).json({ error: err.message });
    }
  }
})

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
