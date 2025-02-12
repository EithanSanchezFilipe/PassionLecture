import { Router } from 'express';
import { auth } from '../middleware/auth.mjs';
import { Register, Login, Profile } from '../controller/user.mjs';
const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', (req, res) => {
  res.send('Logout route');
});
// GET
router.get('/profile', auth, Profile);
// DELETE
router.delete('/delete/:id', (req, res) => {
  res.send('Delete route');
});
router.put('/profile/:id', (req, res) => {
  res.send('Profile route');
});

export default router;
