import { Router } from 'express';
import {
  AddBook,
  DeleteBook,
  ReachBook,
  RatingBook,
  AllBooks,
} from '../controller/book.mjs';
import { auth } from '../middleware/auth.mjs';
const router = Router();

// POST
router.post('/add', AddBook);
router.post('/:id/rating', auth, RatingBook);
router.post('/:id/comment', (req, res) => {
  res.send('comment book route');
});
// GET
router.get('/search', AllBooks);
router.get('/:id', ReachBook);
// DELETE
router.delete('/delete/:id', DeleteBook);
router.delete('/:id/comments/:comment_id', (req, res) => {
  res.send('Delete comment route');
});
// PUT
router.put('/:id', (req, res) => {
  res.send('One book route');
});

export default router;
