const joiValidator = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ message: "Provided Data is not valid", errors });
  }

  req.body = value;
  next();
};

export default joiValidator;
