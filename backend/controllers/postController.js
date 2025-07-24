import Post from "../models/post.js";


export async function createPost(req, res){
  try {
    const { title, content } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      thumbnail
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error in createPost controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error in getAllPosts controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function getPostById (req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error('Error in getPostById controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function updatePost(req, res) {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    const thumbnail = req.file ? req.file.filename : null;

    if (!post || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    if (thumbnail) post.thumbnail=thumbnail;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error in updatePost controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}




