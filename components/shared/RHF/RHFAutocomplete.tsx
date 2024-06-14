// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  isValueArray?: boolean;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  isValueArray,
  renderInput,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput"> &
  Partial<
    Pick<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput">
  >) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        let defaultValue = isValueArray ? ([] as any[]) : "";

        return (
          <Autocomplete
            {...field}
            value={field.value ?? defaultValue}
            onChange={(event, newValue) =>
              setValue(name, newValue, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            renderInput={(params) =>
              renderInput ? (
                renderInput(params)
              ) : (
                <TextField
                  label={label}
                  error={!!error}
                  helperText={error ? error?.message : helperText}
                  {...params}
                  value={params.inputProps.value}
                />
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
