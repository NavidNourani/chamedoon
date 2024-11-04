import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { Controller, useFormContext } from "react-hook-form";

type Props = DatePickerProps<Moment> & {
  name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
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
  );
}
