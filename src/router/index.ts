import express from 'express';

import auth from './auth';
import category from './category';
import transaction from './transaction';

const router = express.Router();

export default (): express.Router => {
  auth(router);
  category(router);
  transaction(router);
  return router;
};
