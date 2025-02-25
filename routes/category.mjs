import { Router } from "express";

const router = Router();

// POST
router.post('/add', (req, res) => {res.send('Add route')});

// GET
router.get('/',(req, res) => {res.send('All category route')});
router.get('/:id',(req, res) => {res.send('One category route')});

export default router;