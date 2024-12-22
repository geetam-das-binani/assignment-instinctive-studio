import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.authToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
