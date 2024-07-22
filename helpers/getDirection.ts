export const getDirection = (locale: string) => {
  if (locale === "fa" || locale === "ar") return "rtl";
  return "ltr";
};
