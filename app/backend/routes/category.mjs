import { Router } from 'express';
import { Create, FindByCategory, Delete } from '../controller/category.mjs';
import { auth } from '../middleware/auth.mjs';

const router = Router();

// POST
router.post('/', auth, Create);
// GET
router.get('/:id/books', FindByCategory);
//DELETE
router.delete('/:id', auth, Delete);

export default router;
