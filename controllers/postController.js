import Post from '../models/Post.js';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export const createPost = async (req, res) => {
  try {
    const validatedData = postSchema.parse(req.body);
    const post = new Post({
      ...validatedData,
      author: req.user.userId,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error creating post' });
    }
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'active' }).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post || post.status === 'deleted') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const validatedData = postSchema.partial().parse(req.body);
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      validatedData,
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }
    res.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error updating post' });
    }
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      { status: 'deleted' },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};