"use server";
import Footer from "@/components/Footer";
import HeaderAuthenticated from "@/components/organisms/HeaderAuthenticated";
import { authOptions } from "@/helpers/authOptions";
import { prisma } from "@/helpers/db";
import { Box, Stack } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <HeaderAuthenticated />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Stack flexGrow={1} overflow="auto" height="100%">
          <Box sx={{ flex: 1, width: "100%", height: "100%" }}>{children}</Box>
          <Footer />
        </Stack>
      </Box>
    </>
  );
};

export default Layout;
