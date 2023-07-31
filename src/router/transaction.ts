import express from 'express';
import checkAuth from 'middlewares/checkAuth';
import {
  create,
  remove,
  update,
  getAll,
  getAllByCategory,
  getAllByTransactionType,
} from 'controllers/TransactionControllers';

export default (router: express.Router) => {
  router.post('/transaction?', checkAuth, create);
  router.get('/transaction', checkAuth, getAll);
  router.get('/transaction/by-category', checkAuth, getAllByCategory);
  router.get('/transaction/by-type', checkAuth, getAllByTransactionType);
  router.patch('/transaction/:id', checkAuth, update);
  router.delete('/transaction/:id', checkAuth, remove);
};
