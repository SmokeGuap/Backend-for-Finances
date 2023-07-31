import express from 'express';
import { register } from 'controllers/UserControllers';

const router = express.Router();

export default router.post('/auth/register', register);
