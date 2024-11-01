import Footer from "@/components/Footer";
import HeaderAuthenticated from "@/components/organisms/HeaderAuthenticated";
import { Box, Stack } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
