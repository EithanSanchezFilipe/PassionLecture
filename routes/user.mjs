import { Router } from 'express';
import { Register, Login } from '../controller/user.mjs';
const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', (req, res) => {
  res.send('Logout route');
});
// GET
router.get('/profile', (req, res) => {
  res.send('Profile route');
});
router.get('/profile/comment', (req, res) => {
  res.send('comment user route');
});
router.get('/profile/rating', (req, res) => {
  res.send('rating user route');
});
// DELETE
router.delete('/delete/:id', (req, res) => {
  res.send('Delete route');
});
router.put('/profile/:id', (req, res) => {
  res.send('Profile route');
});

export default router;
