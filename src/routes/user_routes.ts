import express from 'express';
import { profile, delete_user, update_user } from '../controllers/user';

const router = express.Router();

router
  .get('/:id', profile)
  .put('/:id', update_user)
  .delete('/:id', delete_user)


export default router;