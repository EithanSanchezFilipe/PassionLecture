import { Router } from "express";
import { FindByAuthor, Create, Delete, Update } from "../controller/author.mjs";
import { auth } from "../middleware/auth.mjs";
const router = Router();

// POST
router.post("/add", auth, Create);
// DELETE
router.delete("/delete/:id", auth, Delete);
// PUT
router.put("/:id", auth, Update);
// GET
router.get("/book", FindByAuthor);
export default router;
