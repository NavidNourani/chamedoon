"use server";
import Link from "@/components/atoms/Link";
import { authOptions } from "@/helpers/authOptions";
import { getScopedI18n } from "@/locales/server";
import { AppBar, Toolbar } from "@mui/material";
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import ChangeLanguageButton from "../atoms/ChangeLanguageButton";
import AuthorizationButton from "../molecules/AuthorizationButton";

const HeaderAuthenticated: FunctionComponent = async () => {
  const tPageTitle = await getScopedI18n("pageTitle");
  const session = await getServerSession(authOptions);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
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
