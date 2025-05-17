"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogPostBySlug = exports.deleteBlogPost = exports.updateBlogPost = exports.getBlogPostById = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const adminBlog_1 = __importDefault(require("../models/adminBlog"));
// Create Blog Post
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, slug, content, featured_image, category } = req.body;
        const newPost = new adminBlog_1.default({
            title,
            content,
            slug,
            featured_image,
            category,
        });
        yield newPost.save();
        res.status(201).json({ messsage: "Blog post created successfully" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createBlogPost = createBlogPost;
// Get All Blog Posts
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield adminBlog_1.default.find()
            .populate("category", "name")
            .sort({ createdAt: -1 }); // Sort by `createdAt` in descending order
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllBlogPosts = getAllBlogPosts;
// Get Single Blog Post
const getBlogPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield adminBlog_1.default.findById(req.params.id);
        if (!post) {
            res.status(404).json({ error: "Blog post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getBlogPostById = getBlogPostById;
// Update Blog Post
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield adminBlog_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("category", "name");
        if (!updatedPost) {
            res.status(404).json({ error: "Blog post not found" });
            return;
        }
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateBlogPost = updateBlogPost;
// Delete Blog Post
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield adminBlog_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            res.status(404).json({ error: "Blog post not found" });
            return;
        }
        res.status(200).json({ message: "Blog post deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteBlogPost = deleteBlogPost;
// Get Blog Post by Slug
const getBlogPostBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const post = yield adminBlog_1.default.findOne({ slug: slug }).select("-_id").populate("category", "name");
        if (!post) {
            res.status(404).json({ error: "Blog post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getBlogPostBySlug = getBlogPostBySlug;
