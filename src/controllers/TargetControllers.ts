import express, { NextFunction } from 'express';

import Target from '../models/target';
import { daysToEnd, deadlineDate } from 'utils/date';

export const getAll = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const targets = await Target.find({ user: req.userId });
    res.json(targets);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve targets' });
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const targetId = req.params.id;
    const target = await Target.findByIdAndRemove({ _id: targetId });
    if (!target) {
      return res.status(404).json({ message: 'This target does not exist' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete target' });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const date = new Date();
    const doc = new Target({
      name: req.body.name,
      amount: req.body.amount,
      initialDeposit: req.body.initialDeposit,
      percent: req.body.percent,
      depositTerm: req.body.depositTerm,
      category: req.body.category,
      user: req.userId,
      daysToEnd: daysToEnd(date, deadlineDate(date, req.body.depositTerm)),
      deadlineDate: deadlineDate(date, req.body.depositTerm),
      createdAt: date,
      isClosed: false,
    });
    const target = await doc.save();
    res.json(target);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create target' });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const targetId = req.params.id;
    const target = await Target.updateOne(
      { _id: targetId },
      {
        name: req.body.name,
        amount: req.body.amount,
        percent: req.body.percent,
        depositTerm: req.body.depositTerm,
      }
    );
    if (!target) {
      return res.status(404).json({ message: 'This target does not exist' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update target' });
  }
};

export const updateDaysToEnd = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const date = new Date();
    const targets = await Target.updateMany({}, [
      {
        $set: {
          daysToEnd: {
            $round: [
              { $divide: [{ $subtract: ['$deadlineDate', date] }, 86400000] },
            ],
          },
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update target' });
  }
};
