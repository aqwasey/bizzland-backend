import { Request, Response } from "express";
import BlogPost from "../models/adminBlog";

// Create Blog Post
export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, content, featured_image, category } = req.body;

    const newPost = new BlogPost({
      title,
      content,
      slug,
      featured_image,
      category,
    });

    await newPost.save();
    res.status(201).json({messsage: "Blog post created successfully"});
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Blog Posts
export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await BlogPost.find()
      .populate("category", "name")
      .sort({ createdAt: -1 }); // Sort by `createdAt` in descending order
    res.status(200).json(posts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


// Get Single Blog Post
export const getBlogPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findById(req.params.id)

    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update Blog Post
export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("category", "name");

    if (!updatedPost) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Blog Post
export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


// Get Blog Post by Slug
export const getBlogPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const post = await BlogPost.findOne({ slug: slug }).select("-_id").populate("category", "name");

    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
