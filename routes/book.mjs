import { Router } from "express";

const router = Router();

// POST
router.post('/add', (req, res) => {res.send('Add route')});
router.get('/:id/rating',(req, res) => {res.send('rating book route')});
router.get('/:id/comment',(req, res) => {res.send('comment book route')});
// GET
router.get('/',(req, res) => {res.send('All book route')});
router.get('/:id',(req, res) => {res.send('One book route')});
// DELETE
router.delete('/:id',(req, res) => {res.send('Delete book route')});
router.delete('/:id/comments/:comment_id', (req, res) => {res.send('Delete comment route')});
// PUT
router.put('/:id',(req, res) => {res.send('One book route')} )

export default router;