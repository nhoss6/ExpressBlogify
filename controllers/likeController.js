import Like from '../models/Like.js';
import Post from '../models/Post.js';

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    // Vérifier si le post existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Vérifier si l'utilisateur a déjà liké le post
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    // Créer un nouveau like
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();

    res.status(201).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Error liking post' });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    // Trouver et supprimer le like
    const deletedLike = await Like.findOneAndDelete({ user: userId, post: postId });
    if (!deletedLike) {
      return res.status(404).json({ error: 'Like not found' });
    }

    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Unlike post error:', error);
    res.status(500).json({ error: 'Error unliking post' });
  }
};

export const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ post: postId }).populate('user', 'username');
    res.json(likes);
  } catch (error) {
    console.error('Get likes error:', error);
    res.status(500).json({ error: 'Error retrieving likes' });
  }
};