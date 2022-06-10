// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request{
  id: string,
  title: string,
  type: 'income' | 'outcome',
  value: number,
  category_id: string
}

class CreateTransactionService {
   
  public async execute({id, title, type, value, category_id} : Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);


    const transaction = transactionsRepository.create({
      id, title, value, type, category_id
    })    

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

