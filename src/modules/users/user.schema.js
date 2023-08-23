const { string, object } = require("yup");
const createUserSchema = object().shape({
    email: string()
      .email("This filed should be a valid email address")
      .required("This field must not be empty"),
    name: string()
      .min(2, "This field must be at least 2 characters long")
      .max(30, "This field must be at most 30 characters long")
      .required("This field must not be empty"),
  });

  module.exports.createUserSchema = createUserSchema;