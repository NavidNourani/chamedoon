"use client";

import { I18nProviderClient, useCurrentLocale } from "@/locales/client";
import type { FC, PropsWithChildren } from "react";

export const TranslationProvider: FC<PropsWithChildren> = ({ children }) => {
  const currentLocale = useCurrentLocale();
  return (
    <I18nProviderClient locale={currentLocale} fallback={<p>Loading...</p>}>
      {children}
    </I18nProviderClient>
  );
};
