const globalErrorHandler = (error, req, res, next) => {
  const { status = 500, message = "Server error", data } = error;

  // if (process.env.NODE_ENV !== "development") {
  //   res.status(status).json({ message });
  // }
  console.log("Its the global error handler");
  res.status(status).json({ message, data });
};

export default globalErrorHandler;