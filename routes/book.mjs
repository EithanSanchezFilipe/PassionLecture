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
router.post("/add", AddBook);
router.post("/:id/rating", auth, RatingBook);
// GET
router.get("/search", AllBooks);
router.get("/:id", ReachBook);
// DELETE
router.delete("/delete/:id", DeleteBook);
router.delete("/delete/comment/:id", DeleteCommentBook);
// PUT
router.put("/:id", UpdateBook);

export default router;
