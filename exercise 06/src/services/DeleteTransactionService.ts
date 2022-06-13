import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const testeId = await transactionsRepository.findOne({ where: { id } });

    if (!testeId) {
      throw Error('Impossible delete some transaction does not exist');
    }
    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
