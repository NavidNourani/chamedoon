"use server";
import Link from "@/components/atoms/Link";
import { authOptions } from "@/helpers/authOptions";
import { AppBar, Toolbar } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import ChangeLanguageButton from "../atoms/ChangeLanguageButton";
import AuthorizationButton from "../molecules/AuthorizationButton";
import Sidebar from "./Sidebar";

const HeaderAuthenticated = async () => {
  const session = await getServerSession(authOptions);

  return (
    <AppBar position="sticky" sx={{ mb: "12px" }}>
      <Toolbar>
        <Sidebar />
        <Link href="/app" sx={{ flexGrow: 1 }} color="inherit">
          <Image
            src="/logo-type.svg"
            alt="OrbitPax"
            width={150}
            height={30}
            style={{
              filter: "brightness(0) invert(1)", // Always white in dark header
            }}
            priority
          />
        </Link>
        <ChangeLanguageButton />
        <AuthorizationButton session={session} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuthenticated;
