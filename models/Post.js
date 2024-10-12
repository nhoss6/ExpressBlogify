import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 100
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tags: [{ 
    type: String, 
    trim: true 
  }],
  status: { 
    type: String, 
    enum: ['active', 'deleted'], 
    default: 'active' 
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;