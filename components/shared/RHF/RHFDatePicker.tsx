import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

type Props = DatePickerProps<string> & {
  name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker {...field} label="Basic date picker" {...other} />
      )}
    />
  );
}
