import { useScopedI18n } from "@/locales/client";
import { DateFormat, useAppSettings } from "@/providers/AppSettingsProvider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"; // Import Button component
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

type Props = DatePickerProps<string> & {
  name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control, setValue } = useFormContext();
  const t = useScopedI18n("add_cargo");
  const { dateFormat, setDateFormat } = useAppSettings(); // Get dateFormat and setDateFormat

  const toggleDateFormat = () => {
    setDateFormat(dateFormat === "gregorian" ? "jalali" : "gregorian");
  };

  // useEffect(() => {
  //   setValue(name, undefined);
  //   console.log(
  //     moment().format(
  //       dateFormat === "gregorian" ? "YYYY-MM-DD" : "jYYYY-jMM-jDD"
  //     )
  //   );
  // }, [dateFormat]);

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
          <DatePicker
            value={value ?? null}
            {...field}
            label="Basic date picker"
            {...other}
          />
        )}
      />
    </>
  );
}
