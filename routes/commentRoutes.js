import express from 'express';
import { addComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/:postId', authenticateToken, addComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);

export default router;