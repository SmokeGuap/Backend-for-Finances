import express from 'express';

import auth from './auth';
import category from './category';

const router = express.Router();

export default (): express.Router => {
  auth(router);
  category(router);
  return router;
};
