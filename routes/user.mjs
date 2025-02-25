import { Router } from 'express';
import { auth } from '../middleware/auth.mjs';
import {
  Register,
  Login,
  Profile,
  Delete,
  Update,
  Logout,
} from '../controller/user.mjs';
const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', auth, Logout);
// GET
router.get('/profile', auth, Profile);
// DELETE
router.delete('/delete/', auth, Delete);
router.put('/profile/:id', auth, Update);

export default router;
