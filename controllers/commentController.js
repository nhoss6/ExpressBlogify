import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { z } from 'zod';

const commentSchema = z.object({
  content: z.string().min(1),
});

export const addComment = async (req, res) => {
  try {
    const validatedData = commentSchema.parse(req.body);
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comment = new Comment({
      ...validatedData,
      author: req.user.userId,
      post: req.params.postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error creating comment' });
    }
  }
};

export const updateComment = async (req, res) => {
  try {
    const validatedData = commentSchema.parse(req.body);
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      validatedData,
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    res.json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error updating comment' });
    }
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.user.userId });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};