import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  featured_image?: string;
  category: mongoose.Types.ObjectId;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    featured_image: { type: String },
    category: {type: String },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
export default BlogPost;
