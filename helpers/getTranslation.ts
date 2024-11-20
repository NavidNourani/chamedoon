import { Airport, City, Country, Translations } from "@prisma/client";

export const getTranslation = (
  obj: (Country | City | Airport) & { translations: Translations },
  locale: string
) => {
  console.log("obj11111", Object.keys(obj), obj.name, obj.translations, obj);
  if (locale === "en") {
    return obj.name;
  }
  return obj.translations?.[locale as keyof Translations] || obj.name;
};
