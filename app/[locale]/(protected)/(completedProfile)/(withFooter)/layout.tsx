"use server";
import Footer from "@/components/Footer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
