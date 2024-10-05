export const getDirection = (locale: string) => {
  console.log("locale", locale);
  if (locale === "fa" || locale === "ar") return "rtl";
  return "ltr";
};
