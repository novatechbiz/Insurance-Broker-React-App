import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required.")
    .matches(/\S+@\S+\.\S+/, "Invalid email address."),
});
