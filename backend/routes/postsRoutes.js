import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postController.js";
import {protect} from "../middleware/authMiddleware.js";
import {upload} from "../middleware/upload.js"

const router = express.Router();

router.get("/",getAllPosts);
router.get("/:id",getPostById);
router.post("/",protect, upload.single("thumbnail"),createPost);
router.put("/:id",protect, upload.single("thumbnail"),updatePost);
router.delete("/:id",protect,deletePost);

export default router