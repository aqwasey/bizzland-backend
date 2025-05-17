"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminBlogController_1 = require("../controllers/adminBlogController");
const adminBlogRouter = express_1.default.Router();
adminBlogRouter.post("/blog", adminBlogController_1.createBlogPost);
adminBlogRouter.get("/blog", adminBlogController_1.getAllBlogPosts);
adminBlogRouter.get("/blog/:id", adminBlogController_1.getBlogPostById);
adminBlogRouter.get("/blog-slug/:slug", adminBlogController_1.getBlogPostBySlug);
adminBlogRouter.put("/blog/:id", adminBlogController_1.updateBlogPost);
adminBlogRouter.delete("/blog/:id", adminBlogController_1.deleteBlogPost);
exports.default = adminBlogRouter;
