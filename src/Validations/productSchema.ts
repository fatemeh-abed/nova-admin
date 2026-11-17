import * as Yup from "yup";
import type { Dictionary } from "../Dictionary";

export const productSchema = (d: Dictionary) =>
  Yup.object({
    title: Yup.string().trim().required(d.validation.required),

    description: Yup.string().trim().required(d.validation.required),

    category: Yup.string().trim().required(d.validation.required),

    price: Yup.number()
      .typeError(d.validation.invalidNumber)
      .integer(d.validation.invalidNumber)
      .moreThan(0, d.validation.positiveNumber)
      .required(d.validation.required),

    image: Yup.string()
      .trim()
      .url(d.validation.invalidUrl)
      .required(d.validation.required),
  });
