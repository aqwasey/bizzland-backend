import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostBySlug,
} from "../controllers/adminBlogController";

const adminBlogRouter = express.Router();
adminBlogRouter.post("/blog", createBlogPost);
adminBlogRouter.get("/blog", getAllBlogPosts);
adminBlogRouter.get("/blog/:id", getBlogPostById);
adminBlogRouter.get("/blog-slug/:slug", getBlogPostBySlug);
adminBlogRouter.put("/blog/:id", updateBlogPost);
adminBlogRouter.delete("/blog/:id", deleteBlogPost);
export default adminBlogRouter;
