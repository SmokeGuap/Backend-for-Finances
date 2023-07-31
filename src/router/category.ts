import express from 'express';
import checkAuth from 'middlewares/checkAuth';
import {
  create,
  remove,
  update,
  getAll,
} from 'controllers/CategoryControllers';

export default (router: express.Router) => {
  router.post('/category', checkAuth, create);
  router.get('/category', checkAuth, getAll);
  router.patch('/category/:id', checkAuth, update);
  router.delete('/category/:id', checkAuth, remove);
};
