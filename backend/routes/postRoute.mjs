import express from "express";
const router = express.Router();
import { prisma } from "../db/prismaClient.mjs";
import { auth } from "../middleware/auth.mjs";

router.get("/get-all-posts", async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = 4;
    const skip = req.query.page_no
      ? (parseInt(req.query.page_no) - 1) * limit
      : 0;
    const isIdSearch = !isNaN(search);
    const searchFilter = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            isIdSearch ? { id: parseInt(search) } : null,
          ].filter(Boolean),
        }
      : {};

    const totalPosts = await prisma.post.count({
      where: searchFilter,
    });
    const totalPages = Math.ceil(totalPosts / limit);
    const posts = await prisma.post.findMany({
      where: searchFilter,
      include: {
        author: true,
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (posts.length === 0)
      return res.status(200).json({ success: true, data: [], totalPages: 0 });

    res.status(200).json({ success: true, data: posts, totalPages });
  } catch (error) {
    console.log("Error in get-all-posts route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/create-post", auth, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const authorId = req.userId;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        imageUrl,
      },
    });
    if (!post)
      return res
        .status(400)
        .json({ success: false, message: "Post not created" });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error("Error in create-post route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/update-post/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        imageUrl,
      },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error in update-post route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.get("/get-post/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
      },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error in get-post route:", error);
    res.status(500).json({ success: false, message: "Unable to get Posts" });
  }
});

router.delete("/delete-post/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error in delete-post route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { router as postRoutes };
