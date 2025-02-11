import { Router } from "express";
import {Login} from "../controller/user.mjs";
const router = Router();


// POST
router.post('/login' , Login);
router.post('/register', (req, res) => {res.send('Register route')});
router.post('/logout', (req, res) => {res.send('Logout route')});
router.post('/:id/book', (req, res) => {res.send('add book author routes')});
// GET
router.get('/profile', (req, res) => {res.send("Profile route");});
router.get('/profile/comment', (req, res) => {res.send("comment user route");});
router.get('/profile/rating', (req, res) => {res.send("rating user route");});
// DELETE
router.delete('/delete/:id', (req, res) => {res.send("Delete route");})
router.delete('/:id/book/:book_id', (req, res) => {res.send('delete book routes')});
// PUT
router.put('/:id/book/:book_id', (req, res) => {res.send('modify book routes')});
router.put('/profile/:id', (req, res) => {res.send("Profile route");})

export default router;