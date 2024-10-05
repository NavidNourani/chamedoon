"use client";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";
export type DateFormat = "gregorian" | "jalali" | "hijri";

type AppSettingsContextType = {
  themeMode: ThemeMode;
  dateFormat: DateFormat;
  setThemeMode: (themeMode: ThemeMode) => void;
  setDateFormat: (dateFormat: DateFormat) => void;
};

const AppSettingsContext = createContext<AppSettingsContextType>({
  themeMode: "light",
  dateFormat: "gregorian",
  setThemeMode: () => {},
  setDateFormat: () => {},
});

const AppSettingsProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [dateFormat, setDateFormat] = useState<DateFormat>("jalali");
  return (
    <AppSettingsContext.Provider
      value={{ themeMode, dateFormat, setThemeMode, setDateFormat }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used within a AppSettingsProvider");
  }
  return context;
};

export default AppSettingsProvider;
