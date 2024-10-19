import { useScopedI18n } from "@/locales/client";
import { DateFormat, useAppSettings } from "@/providers/AppSettingsProvider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"; // Import Button component
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import moment, { Moment } from "moment-jalaali"; // Ensure moment is imported
import { Controller, useFormContext } from "react-hook-form";

type Props = DateTimePickerProps<Moment> & {
  name: string;
};

export default function RHFDateTimePicker({ name, ...other }: Props) {
  const { control, setValue } = useFormContext();
  const t = useScopedI18n("add_parcel");
  const { dateFormat, setDateFormat } = useAppSettings(); // Get dateFormat and setDateFormat

  const toggleDateFormat = () => {
    setDateFormat(dateFormat === "gregorian" ? "jalali" : "gregorian");
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t("dateFormat")}</InputLabel>
        <Select
          value={dateFormat}
          onChange={(e) => setDateFormat(e.target.value as DateFormat)}
          label={t("dateFormat")}
          labelId="demo-simple-select-label"
        >
          <MenuItem value="gregorian">{t("gregorian")}</MenuItem>
          <MenuItem value="jalali">{t("jalali")}</MenuItem>
        </Select>
      </FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ...field }, fieldState: { error } }) => (
          <DateTimePicker
            value={value ? moment(value) : null} // Ensure value is a Moment object
            {...field}
            label="Basic date picker"
            {...other}
          />
        )}
      />
    </>
  );
}
