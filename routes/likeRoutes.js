import express from 'express';
import { likePost, unlikePost, getLikes } from '../controllers/likeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/:postId', authenticateToken, likePost);
router.delete('/:postId', authenticateToken, unlikePost);
router.get('/:postId', getLikes);

export default router;