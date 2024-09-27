import HeaderUnauthenticated from "@/components/organisms/HeaderUnauthenticated";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderUnauthenticated />
      {children}
    </>
  );
};

export default Layout;
