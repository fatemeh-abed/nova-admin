import * as Yup from "yup";
import type { Dictionary } from "../Dictionary";

export const userSchema = (d: Dictionary) =>
  Yup.object({
    firstname: Yup.string().trim().required(d.validation.required),

    lastname: Yup.string().trim().required(d.validation.required),

    username: Yup.string().trim().required(d.validation.required),

    email: Yup.string()
      .trim()
      .email(d.validation.invalidEmail)
      .required(d.validation.required),

    password: Yup.string()
      .min(6, d.validation.passwordMinLength)
      .required(d.validation.required),

    phone: Yup.string()
      .trim()
      .matches(/^\+?[0-9()\s-]{7,20}$/, d.validation.invalidPhone)
      .required(d.validation.required),
  });
