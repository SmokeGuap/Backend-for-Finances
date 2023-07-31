import express from 'express';

import Category from '../models/category';

export const getAll = async (req: express.Request, res: express.Response) => {
  try {    
    const userId = req.userId;
    const categories = await Category.find({ user: userId });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndRemove({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ message: 'This category does not exist' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const doc = new Category({
      name: req.body.name,
      user: req.userId,
    });
    const category = await doc.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.updateOne(
      { _id: categoryId },
      {
        name: req.body.name,
        user: req.userId,
      }
    );
    if (!category) {
      return res.status(404).json({ message: 'This category does not exist' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update category' });
  }
};
