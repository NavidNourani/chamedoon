"use client";
import Link from "@/components/atoms/Link";
import { Login, Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { FC } from "react";

interface IProps {
  session: Session | null;
}

const AuthorizationButton: FC<IProps> = ({ session }) => {
  if (session) {
    return (
      <Button color="inherit" onClick={() => signOut()} endIcon={<Logout />}>
        Logout
      </Button>
    );
  }
  return (
    <Link href="/login">
      <Button color="inherit" endIcon={<Login />}>
        Login
      </Button>
    </Link>
  );
};

export default AuthorizationButton;
