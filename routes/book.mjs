import { Router } from "express";
import {
  AddBook,
  UpdateBook,
  DeleteBook,
  DeleteCommentBook,
  ReachBook,
  RatingBook,
  AllBooks,
} from "../controller/book.mjs";
import { auth } from "../middleware/auth.mjs";
const router = Router();

// POST
router.post("/add", auth, AddBook);
router.post("/:id/rating", auth, RatingBook);
// GET
router.get("/search", auth, AllBooks);
router.get("/:id", auth, ReachBook);
// DELETE
router.delete("/delete/:id", auth, DeleteBook);
router.delete("/delete/comment/:id", auth, DeleteCommentBook);
// PUT
router.put("/:id", auth, UpdateBook);

export default router;
