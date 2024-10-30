import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

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

export const adminAuthMiddleware = (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return response.status(403).json({
        message: "Access denied. No token provided.",
        success: 0,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "random");

    if (decoded.role !== "admin") {
      return response.status(403).json({
        message: "Access denied. Admins only.",
        success: 0,
      });
    }

    request.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      message: "Invalid token.",
      success: 0,
    });
  }
};