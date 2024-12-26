const PostSchema = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const newPost = await PostSchema.find();
    return res.status(200).json({ newPost, status: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    return res.status(201).json({ newPost, status: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById(id);
    return res.status(200).json({ detailPost, status: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ updatePost, status: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted", status: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");
    const posts = await PostSchema.find({
      $or: [{ title }],
      tag: { $in: tag.split(",") },
    });
    return res.status(200).json({ posts, status: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getDetail,
  getUpdate,
  deletePost,
  searchPost,
};
