"use server";
import Link from "@/components/atoms/Link";
import { authOptions } from "@/helpers/authOptions";
import { getScopedI18n } from "@/locales/server";
import { AppBar, Toolbar } from "@mui/material";
import { getServerSession } from "next-auth";
import ChangeLanguageButton from "../atoms/ChangeLanguageButton";
import AuthorizationButton from "../molecules/AuthorizationButton";
import Sidebar from "./Sidebar";

const HeaderAuthenticated = async () => {
  const tPageTitle = await getScopedI18n("pageTitle");
  const session = await getServerSession(authOptions);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Sidebar />
        <Link href="/" sx={{ flexGrow: 1 }} variant="h6" color="inherit">
          {tPageTitle("orbit_pax")}
        </Link>
        <ChangeLanguageButton />
        <AuthorizationButton session={session} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuthenticated;
