"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../atoms/BackButton";
import Sidebar from "../organisms/Sidebar";

const NavigationSelector = () => {
  const pathname = usePathname();
  const [selectedComponent, setSelectedComponent] = useState<
    "sidebar" | "back"
  >("sidebar");

  useEffect(() => {
    setSelectedComponent(pathname?.includes("/app/") ? "back" : "sidebar");
  }, [pathname]);

  if (selectedComponent === "sidebar") {
    return <Sidebar />;
  }
  if (BackButton) {
    return <BackButton />;
  }
  return null;
};

export default NavigationSelector;
