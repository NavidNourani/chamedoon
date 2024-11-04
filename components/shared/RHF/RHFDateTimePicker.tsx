import { useScopedI18n } from "@/locales/client";
import { useAppSettings } from "@/providers/AppSettingsProvider";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import moment, { Moment } from "moment-jalaali"; // Ensure moment is imported
import { Controller, useFormContext } from "react-hook-form";

type Props = DateTimePickerProps<Moment> & {
  name: string;
};

export default function RHFDateTimePicker({ name, ...other }: Props) {
  const { control } = useFormContext();
  const t = useScopedI18n("add_parcel");
  const { dateFormat, setDateFormat } = useAppSettings(); // Get dateFormat and setDateFormat

  return (
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
  );
}
