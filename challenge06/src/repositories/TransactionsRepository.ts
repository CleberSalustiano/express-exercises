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
    const incomeTransactions = await this.find({
      where: {type: "income"}
    });
    const outcomeTransactions = await this.find({
      where: {type: "outcome"}
    });
    let income = 0;
    let outcome = 0;

    incomeTransactions.forEach((incomeTransaction) => income += incomeTransaction.value)
        
    outcomeTransactions.forEach((outcomeTransaction) => outcome += outcomeTransaction.value)

    const balance : Balance = {
      income,
      outcome,
      total: (income - outcome),
    }

    return balance
  }
}

export default TransactionsRepository;
