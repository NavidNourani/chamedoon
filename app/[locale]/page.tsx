// import { setStaticParamsLocale } from 'next-international/server';
import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getCurrentLocale, getScopedI18n } from "../../locales/server";
import Client from "./client";

// Uncomment to test Static Generation on this page only
// export function generateStaticParams() {
//   return getStaticParams();
// }

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Uncomment to test Static Generation
  // setStaticParamsLocale(locale);

  const t2 = await getScopedI18n("add_cargo");
  const currentLocale = getCurrentLocale();

  return (
    <div>
      <TranslationProvider locale={locale}>
        <Client />
      </TranslationProvider>
      <h1>SSR / SSG</h1>
      <button className="btn btn-accent">test</button>
      <p>
        Current locale:
        <span>{currentLocale}</span>
      </p>
      <p>{t2("Cargo_Description")}</p>
    </div>
  );
}
