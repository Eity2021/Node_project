const { string, object ,ref} = require("yup");
const createUserSchema = object().shape({
    email: string()
      .email("This filed should be a valid email address")
      .required("This field must not be empty"),
    firstName: string()
      .min(2, "This field must be at least 2 characters long")
      .max(30, "This field must be at most 30 characters long")
      .required("This field must not be empty"),
    lastName: string()
      .min(2, "This field must be at least 2 characters long")
      .max(30, "This field must be at most 30 characters long")
      .required("This field must not be empty"),
    password: string()
    .min(8 , 'The password must be at least 8 characters long')
    .max(50, 'The passport  must be at most 50 characters long')
    .required('Password is required'),
    confirmPassword: string()
    .required('Confirm password is required')
    .oneOf([ref('password'), null], 'Password and confirm password must be matched' )

  });
const UserUpdateSchema = object().shape({
    firstName: string()
      .min(2, "This field must be at least 2 characters long")
      .max(30, "This field must be at most 30 characters long")
      .required("This field must not be empty"),
    lastName: string()
      .min(2, "This field must be at least 2 characters long")
      .max(30, "This field must be at most 30 characters long")
      .required("This field must not be empty"),


  });

  module.exports.createUserSchema = createUserSchema;
  module.exports.UserUpdateSchema = UserUpdateSchema;