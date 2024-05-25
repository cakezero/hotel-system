import express from "express";
import { login, login_post, register, register_post } from '../controllers/auth';

const router = express.Router();

router
  .get('/login', login)
  .post('/login', login_post)
  .get('/register', register)
  .post('/register', register_post)

export default router;
