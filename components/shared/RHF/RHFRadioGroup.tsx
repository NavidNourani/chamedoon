// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
    Radio,
    FormLabel,
    RadioGroup,
    FormControl,
    FormHelperText,
    RadioGroupProps,
    FormControlLabel,
} from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
    name: string;
    options: { label: ReactNode; value: any }[];
    label?: string;
    spacing?: number;
    helperText?: React.ReactNode;
    hideRadio?: boolean
};

export default function RHFRadioGroup({
                                          hideRadio = false,
                                          row,
                                          name,
                                          label,
                                          options,
                                          spacing,
                                          helperText,
                                          ...other
                                      }: Props) {
    const { control } = useFormContext();

    const labelledby = label ? `${name}-${label}` : '';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl component='fieldset'>
                    {label && (
                        <FormLabel component='legend' id={labelledby} sx={{ typography: 'body2' }}>
                            {label}
                        </FormLabel>
                    )}

                    <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio sx={{ display: hideRadio ? 'none' : 'flex' }} />}
                                label={option.label}
                                sx={{
                                    '&:not(:last-of-type)': {
                                        mb: spacing ?? 0,
                                    },
                                    ...(row && {
                                        mr: 0,
                                        '&:not(:last-of-type)': {
                                            mr: spacing ?? 2,
                                        },
                                    }),
                                }}
                            />
                        ))}
                    </RadioGroup>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} sx={{ mx: 0 }}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}
