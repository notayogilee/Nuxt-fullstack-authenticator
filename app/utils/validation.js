export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  if (email.length > 254) {
    return { valid: false, error: "Email is too long" };
  }

  return { valid: true, error: "" };
};

export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, error: "Password is required" };
  }

  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" };
  }

  if (password.length > 128) {
    return { valid: false, error: "Password is too long" };
  }

  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    return { valid: false, error: "Password must contain letters and numbers" };
  }

  return { valid: true, error: "" };
};

export const validateName = (name) => {
  if (!name) {
    return { valid: false, error: "Name is required" };
  }

  const trimmed = name.trim();

  if (trimmed.length < 1) {
    return { valid: false, error: "Name cannot be empty" };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "Name is too long (max 100 characters)" };
  }

  return { valid: true, error: "" };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords do not match" };
  }

  return { valid: true, error: "" };
};
