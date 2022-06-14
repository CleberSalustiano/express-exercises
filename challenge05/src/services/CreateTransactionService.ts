import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id, title, type, value }: Transaction): Transaction {
    const testeId = this.transactionsRepository
      .all()
      .find(transaction => transaction.id === id);

    if (testeId) {
      throw Error('This transaction is already created');
    }

    const transaction = this.transactionsRepository.create({
      id,
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
