import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Not authenticated",
    });
  }

  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "User not found",
      });
    }

    return {
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Invalid token",
    });
  }
});
