import { Router } from "express";
import {
  Create,
  Update,
  Delete,
  DeleteComment,
  Reach,
  Rating,
  All,
} from "../controller/book.mjs";
import { auth } from "../middleware/auth.mjs";
const router = Router();

// POST
/**
 * @swagger
 * /book/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - summary
 *               - editionYear
 *               - pages
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: integer
 *               summary:
 *                 type: string
 *               editionYear:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               category_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
router.post("/add", auth, Create);
/**
 * @swagger
 * /book/{id}/rating:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Add rating to a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating added successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/:id/rating", auth, Rating);
// GET
/**
 * @swagger
 * /book/search:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Search books
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by book name
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         description: Unauthorized
 */
router.get("/search", auth, All);
/**
 * @swagger
 * /book/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Get book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */

router.get("/:id", auth, Reach);
// DELETE
/**
 * @swagger
 * /book/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */

router.delete("/delete/:id", auth, Delete);
/**
 * @swagger
 * /book/delete/comment/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete/comment/:id", auth, DeleteComment);
// PUT
/**
 * @swagger
 * /book/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: integer
 *               summary:
 *                 type: string
 *               editionYear:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               category_fk:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */

router.put("/:id", auth, Update);

export default router;
