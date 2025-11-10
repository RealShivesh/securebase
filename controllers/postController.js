import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content, author: req.user.id });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username email");
  res.status(200).json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await post.deleteOne();
  res.status(200).json({ message: "Post deleted successfully" });
};
