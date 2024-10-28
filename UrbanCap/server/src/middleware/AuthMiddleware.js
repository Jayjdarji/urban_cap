import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided.", success: 0 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "random");

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid token.", success: 0 });
  }
};

export default authMiddleware;
