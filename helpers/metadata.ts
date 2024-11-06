import { getScopedI18n } from "@/locales/server";

export async function generatePageMetadata(
  page:
    | "home"
    | "login"
    | "signup"
    | "error"
    | "addCargo"
    | "parcels"
    | "flights"
    | "addFlight"
    | "support"
    | "editProfile",
  locale: string
) {
  const tPageTitle = await getScopedI18n("pageTitle");
  const tMetaDesc = await getScopedI18n("metaDescription");

  return {
    title: tPageTitle(page as any),
    description: tMetaDesc(page),
    alternates: {
      languages: {
        en: `/${locale === "en" ? "" : "en"}`,
        fa: `/${locale === "fa" ? "" : "fa"}`,
      },
    },
  };
}
