import express from 'express';
import checkAuth from 'middlewares/checkAuth';
import {
  create,
  remove,
  update,
  getAll,
  updateDaysToEnd,
  invest,
  close,
} from 'controllers/TargetControllers';

export default (router: express.Router) => {
  router.post('/target', checkAuth, create);
  router.get('/target', checkAuth, getAll, updateDaysToEnd);
  router.patch('/target/:id', checkAuth, update);
  router.delete('/target/:id', checkAuth, remove);
  router.patch('/target/:id/invest', checkAuth, invest);
  router.patch('/target/:id/close', checkAuth, close);
};
