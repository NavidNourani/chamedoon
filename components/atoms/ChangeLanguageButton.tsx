"use client";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "@/locales/client";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const ChangeLanguageButton = () => {
  const t = useScopedI18n("select_language");
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  const handleChange = (event: SelectChangeEvent) => {
    changeLocale(event.target.value as "en" | "fa");
  };
  return (
    <Select
      sx={{
        color: "inherit",
        "&>fieldset": { border: "unset" },
        "& .MuiSelect-icon": { color: "inherit" },
      }}
      value={currentLocale}
      onChange={handleChange}
    >
      <MenuItem value="en">{t("en")}</MenuItem>
      <MenuItem value="fa">{t("fa")}</MenuItem>
    </Select>
  );
};

export default ChangeLanguageButton;
