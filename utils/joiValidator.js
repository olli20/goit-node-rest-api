import HttpError from "./httpError.js";

const joiValidator = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default joiValidator;
