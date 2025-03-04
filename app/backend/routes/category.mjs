import { Router } from 'express';
import { Create, FindByCategory, Delete } from '../controller/category.mjs';
import { auth } from '../middleware/auth.mjs';

const router = Router();

// POST
router.post('/add', auth, Create);
// GET
router.get('/book', FindByCategory);
//DELETE
router.delete('/delete/:id', auth, Delete);

export default router;
