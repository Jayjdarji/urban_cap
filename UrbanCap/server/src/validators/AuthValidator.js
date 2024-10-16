export const registerValidator = (request, response, next) => {
  const user = request.body;

  // Define the required fields
  const requiredFields = ["email", "password", "name"];

  const missingFields = requiredFields.filter((field) => !user[field]);

  if (missingFields.length > 0) {
    return response.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
      success: 0,
    });
  }

  next();
};

export const signInValidator = (request, response, next) => {
  const user = request.body;

  // Define the required fields
  const requiredFields = ["email", "password"];

  const missingFields = requiredFields.filter((field) => !user[field]);

  if (missingFields.length > 0) {
    return response.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
      success: 0,
    });
  }

  next();
};
