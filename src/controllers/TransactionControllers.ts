import express from 'express';

import Transaction from '../models/transaction';

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const transactionYear = req.query.year;
    const transactionMonth = req.query.month;
    const startDate = new Date(+transactionYear, +transactionMonth - 1, 1);
    const endDate = new Date(+transactionYear, +transactionMonth, 1);
    const userId = req.userId;
    const transactions = await Transaction.find({
      user: userId,
      transactionDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
  }
};

export const getAllByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transactions = await Transaction.aggregate([
      { $group: { _id: '$category', amount: { $sum: '$amount' } } },
    ]);
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
  }
};

export const getAllByTransactionType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transactions = await Transaction.aggregate([
      { $group: { _id: '$transactionType', amount: { $sum: '$amount' } } },
    ]);
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByIdAndRemove({
      _id: transactionId,
    });
    if (!transaction) {
      return res
        .status(404)
        .json({ message: 'This transaction does not exist' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
};

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const doc = new Transaction({
      transactionType: req.body.transactionType,
      transactionDate: req.body.transactionDate,
      amount: req.body.amount,
      category: req.body.category,
      user: req.userId,
    });
    const category = await doc.save();
    res.json(category);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.updateOne(
      { _id: transactionId },
      {
        transactionType: req.body.transactionType,
        transactionDate: req.body.transactionDate,
        amount: req.body.amount,
        category: req.body.category,
        user: req.userId,
      }
    );
    if (!transaction) {
      return res
        .status(404)
        .json({ message: 'This transaction does not exist' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update transaction' });
  }
};
