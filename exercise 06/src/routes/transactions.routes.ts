import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import { getCustomRepository } from 'typeorm';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category } = request.body;
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const { total } = await transactionsRepository.getBalance();

    if (type !== 'income' && type !== 'outcome') {
      throw Error('This transaction is not correct.');
    }

    if (type === 'outcome' && total < value) {
      throw Error(
        'This transaction is not possible because do not have enough money',
      );
    }

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category_title: category,
    });

    return response.json(transaction);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  try {
    const deleteTransaction = new DeleteTransactionService();

    const { id } = request.params;

    await deleteTransaction.execute(id);

    return response.status(204).json();
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
