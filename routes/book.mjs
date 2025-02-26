import { Router } from 'express';
import {
  Create,
  Update,
  Delete,
  DeleteComment,
  Reach,
  Rating,
  All,
} from '../controller/book.mjs';
import { auth } from '../middleware/auth.mjs';
const router = Router();

// POST
router.post('/add', auth, Create);
router.post('/:id/rating', auth, Rating);
// GET
router.get('/search', All);
router.get('/:id', auth, Reach);
// DELETE
router.delete('/delete/:id', auth, Delete);
router.delete('/delete/comment/:id', auth, DeleteComment);
// PUT
router.put('/:id', auth, Update);

export default router;
