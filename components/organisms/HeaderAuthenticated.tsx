"use server";
import Link from "@/components/atoms/Link";
import { authOptions } from "@/helpers/authOptions";
import { AppBar, Box, Toolbar } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import ChangeLanguageButton from "../atoms/ChangeLanguageButton";
import AuthorizationButton from "../molecules/AuthorizationButton";
import NavigationSelector from "../molecules/NavigationSelector";

const HeaderAuthenticated = async () => {
  const session = await getServerSession(authOptions);

  return (
    <AppBar position="sticky" sx={{ mb: "12px" }}>
      <Toolbar>
        <NavigationSelector />
        <Link href="/app" sx={{ flexGrow: 1 }} color="inherit">
          <Image
            src="/logo-type.svg"
            alt="OrbitPax"
            width={150}
            height={30}
            priority
            style={{ filter: "drop-shadow(1px 1px 1px white)" }}
          />
        </Link>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <ChangeLanguageButton />
          <AuthorizationButton session={session} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuthenticated;
