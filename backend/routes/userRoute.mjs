import express from "express";
const router = express.Router();
import { prisma } from "../db/prismaClient.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.mjs";
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendResponse = (res, status, success, message, data = {}) => {
  res.status(status).json({ success, message, ...data });
};

router.post("/register-user", async (req, res) => {
  try {
    const { name, email, password, imageUrl } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, false, "All fields are required");
    }
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return sendResponse(res, 400, false, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        imageUrl,
      },
    });

    if (!user) {
      return sendResponse(res, 400, false, "User not created");
    }

    const token = createToken(user.id);

    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        success: true,
        message: "User created successfully",
        user,
      });
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, false, "Internal server error", {
      error: error.message,
    });
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return sendResponse(res, 400, false, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 400, false, "Invalid credentials");
    }

    const token = createToken(user.id);

    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })

      .json({
        success: true,
        message: "User logged in successfully",
        user,
      });
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, false, "Internal server error", {
      error: error.message,
    });
  }
});

router.put("/update-user", auth, async (req, res) => {
  try {
    const { name, email, imageUrl } = req.body;

    const isUserFound = await prisma.user.findUnique({
      where: { id: parseInt(req.userId) }
    });

    if (!isUserFound) {
      return sendResponse(res, 400, false, "User not found");
    }
    const user = await prisma.user.update({
      where: { id: parseInt(req.userId) },
      data: {
        name,
        email,
        imageUrl,
      },
    });

    if (!user) {
      return sendResponse(res, 400, false, "User not updated");
    }

    sendResponse(res, 200, true, "User updated successfully", { user });
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, false, "Internal server error", {
      error: error.message,
    });
  }
});

router.post("/logout-user", async (req, res) => {
  try {
    res.clearCookie("authToken").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, false, "Internal server error", {
      error: error.message,
    });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.userId) },
    });
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }
    sendResponse(res, 200, true, "User found", { user });
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, false, "Internal server error", {
      error: error.message,
    });
  }
});

export { router as userRoutes };
