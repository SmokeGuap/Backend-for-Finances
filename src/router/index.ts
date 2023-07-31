import express from 'express';

import auth from './auth';
import category from './category';
import transaction from './transaction';
import target from './target';

const router = express.Router();

export default (): express.Router => {
  auth(router);
  category(router);
  transaction(router);
  target(router);
  return router;
};
