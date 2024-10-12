import { DateFormat } from "@/providers/AppSettingsProvider";
import momentJalaali from "moment-jalaali";

export const formatDate = (
  dateFormat: DateFormat,
  dateString: Date | null | undefined
) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (dateFormat === "jalali") {
    return momentJalaali(date).format("jYYYY-jMM-jDD");
  }
  return momentJalaali(date).format("YYYY-MM-DD");
};
