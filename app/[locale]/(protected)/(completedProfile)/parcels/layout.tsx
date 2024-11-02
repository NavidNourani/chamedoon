import { getScopedI18n } from "@/locales/server";
import { FunctionComponent, PropsWithChildren } from "react";

export async function generateMetadata() {
  const tPageTitle = await getScopedI18n("pageTitle");
  return {
    title: tPageTitle("parcels"),
  };
}

const layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
