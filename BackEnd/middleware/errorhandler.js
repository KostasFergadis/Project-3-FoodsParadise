const errorHandler = (err, req, res, next) => {
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(403).json({ message: "Invalid Token" });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Wrong input" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: "User already exists" });
  }
  console.log(err);
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
