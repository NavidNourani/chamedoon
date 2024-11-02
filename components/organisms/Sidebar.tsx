"use client";
import Link from "@/components/atoms/Link";
import { useScopedI18n } from "@/locales/client";
import { FlightTakeoff, Help, Home, LocalShipping } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useScopedI18n("navigation");

  const menuItems = [
    { text: t("home"), icon: <Home />, href: "/" },
    { text: t("all_parcels"), icon: <LocalShipping />, href: "/parcels" },
    { text: t("all_flights"), icon: <FlightTakeoff />, href: "/flights" },
    { text: t("support"), icon: <Help />, href: "/support" },
  ];

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, display: {} }}
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <Toolbar />
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <>
              <ListItem
                key={item.text}
                component={Link}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              {index < menuItems.length - 1 && <Divider />}
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
