import Commerce from "@chec/commerce.js";
export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY ??
    "pk_49610aefca974cfc2a6be4a665f4e3ce4c83c4e664fc6",
  true
);
