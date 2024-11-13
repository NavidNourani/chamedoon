import { useScopedI18n } from "@/locales/client";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();
  const t = useScopedI18n("formErrors");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value ?? ""
          }
          onKeyDown={(e) => {
            //backspace
            if (e.which === 8) {
              return;
            }
            //only number if type is number
            if (other.type === "number" && !/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          error={!!error}
          helperText={error ? t(error?.message as any) : helperText}
          {...other}
        />
      )}
    />
  );
}
