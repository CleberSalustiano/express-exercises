import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

//FINALIZAR
@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const findIncome = await this.find({
      where: {type: "income"}
    });
    const findOutcome = await this.find({
      where: {type: "outcome"}
    });

    const balance : Balance = {
      income: 2,
      outcome: 2,
      total: 0,
    }

    return balance

  }
}

export default TransactionsRepository;
