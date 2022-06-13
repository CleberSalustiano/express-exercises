import Transaction from '../models/Transaction';
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import CreateTransactionService from './CreateTransactionService';
import Category from '../models/Category';
import { getRepository } from 'typeorm';


class ImportTransactionsService {
  async execute(csvLocalization: string): Promise<Transaction[]> {
    const readCSVStream = fs.createReadStream(csvLocalization);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Array<string>[] = [];

    parseCSV.on('data', line => {
      lines.push(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const createTransaction = new CreateTransactionService();
    const transactions: Transaction[] = [];

    for (const line of lines) {
      const transaction = await createTransaction.execute({
        title: line[0],
        type: (line[1] as 'income') || 'outcome',
        value: parseInt(line[2]),
        category_title: line[3],
      });
      transactions.push(transaction);
    }
    return transactions;
  }

  
}

export default ImportTransactionsService;
