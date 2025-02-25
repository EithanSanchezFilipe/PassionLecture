import { Router } from 'express';
import { auth } from '../middleware/auth.mjs';
import {
  Register,
  Login,
  Profile,
  Delete,
  Update,
} from '../controller/user.mjs';
const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', (req, res) => {
  res.send('Logout route');
});
// GET
router.get('/profile', auth, Profile);
// DELETE
router.delete('/delete/', auth, Delete);
router.put('/profile/:id', auth, Update);

export default router;
