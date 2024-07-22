"use client";

import { useI18n } from "../../locales/client";

export default function Client() {
  const t = useI18n();

  return <p>From client: {t("add_cargo.Departure_City")}</p>;
}
