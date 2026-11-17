export const formatPrice = (
  price: number,
  language: "fa" | "en" = "fa",
): string => {
  const locale = language === "fa" ? "fa-IR" : "en-US";

  const formattedPrice = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  })
    .format(price)
    .replace(/[,٬]/g, "/");

  return `${formattedPrice} ${language === "fa" ? "تومان" : "Toman"}`;
};
