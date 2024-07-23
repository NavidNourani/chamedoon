"use client";
import Link from "@/components/atoms/Link";
import { useScopedI18n } from "@/locales/client";
import { Login, Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { FC } from "react";

interface IProps {
  session: Session | null;
}

const AuthorizationButton: FC<IProps> = ({ session }) => {
  const t = useScopedI18n("authorization");
  if (session) {
    return (
      <Button color="inherit" onClick={() => signOut()} endIcon={<Logout />}>
        {t("logout")}
      </Button>
    );
  }
  return (
    <Link href="/login">
      <Button color="inherit" endIcon={<Login />}>
        {t("login")}
      </Button>
    </Link>
  );
};

export default AuthorizationButton;
