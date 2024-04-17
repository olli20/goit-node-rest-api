const catchAsync = (fn) => (req, res, next) => {
  // console.log("Ist Catch Async Handler");
  fn(req, res, next).catch((error) => next(error));
};

export default catchAsync;
