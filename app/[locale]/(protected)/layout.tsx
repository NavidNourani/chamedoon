import HeaderAuthenticated from "@/components/organisms/HeaderAuthenticated";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderAuthenticated />
      {children}
    </>
  );
};

export default Layout;
