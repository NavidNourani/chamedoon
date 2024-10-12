"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "@/components/atoms/Link";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import ChangeLanguageButton from "../atoms/ChangeLanguageButton";
import AuthorizationButton from "../molecules/AuthorizationButton";

const HeaderAuthenticated: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/" sx={{ flexGrow: 1 }} variant="h6" color="inherit">
          Chamedoon
        </Link>
        <ChangeLanguageButton />
        <AuthorizationButton session={session} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuthenticated;
