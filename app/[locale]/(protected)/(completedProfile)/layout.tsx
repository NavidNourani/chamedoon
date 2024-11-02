"use server";
import { authOptions } from "@/helpers/authOptions";
import { prisma } from "@/helpers/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });
  if (!user?.countryCode || !user?.phone || !user?.name || !user?.family) {
    redirect("/editProfile");
  }

  return <>{children}</>;
};

export default Layout;
