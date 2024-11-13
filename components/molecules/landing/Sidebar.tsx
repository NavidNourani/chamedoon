import ChangeLanguageButton from "@/components/atoms/ChangeLanguageButton";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";
import { useScopedI18n } from "@/locales/client";
import { Box, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { data: session, status } = useSession();
  const t = useScopedI18n("authorization");
  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          display: open ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1100,
        }}
      />
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: open ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "250px",
          height: "100%",
          bgcolor: "background.paper",
          zIndex: 1200,
          p: 2,
          marginLeft: "unset !important",
        }}
      >
        <Stack spacing={2}>
          <ChangeLanguageButton />
          <ThemeToggleButton />
          <Button
            component={Link}
            href={session ? "/app" : "/login"}
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            {session?.user ? t("dashboard") : t("login")}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
