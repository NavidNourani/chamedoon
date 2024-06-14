"use client";

import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import { RHFCheckbox } from "@/components/shared/RHF/RHFCheckbox";
import RHFDatePicker from "@/components/shared/RHF/RHFDatePicker";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import useCountries from "@/hooks/useCountries";
import { createCargoForCurrentUser } from "@/serverActions/createCargoForCurrentUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, ListItem, Typography } from "@mui/material";
import { CargoShipment, CityCountry } from "@prisma/client";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  approximateDateTime: yup.date().optional(),
  immediateDelivery: yup.boolean().required(),
  departureCountry: yup.string().required("Departure country is required"),
  departureCity: yup.string().required("Departure city is required"),
  destinationCountry: yup.string().required("Destination country is required"),
  destinationCity: yup.string().required("Destination city is required"),
  cargoDescription: yup.string().required(),
  estimatedCost: yup.number().optional(),
});

type FormData = CargoShipment & {
  departureCountry: string;
  destinationCountry: string;
};

const FlightForm = () => {
  const { t } = useTranslation();
  const { countries, getCities } = useCountries();
  const [departureCities, setDepartureCities] = useState<CityCountry[]>([]);
  const [citiesFilter, setCitiesFilter] = useState<string>("");
  const methods = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  // Get the cities for the selected departure country
  useEffect(() => {
    if (methods.watch("departureCountry")) {
      getCities(methods.watch("departureCountry")).then((cities) => {
        if (cities) {
          setDepartureCities(cities);
        }
      });
    }
  }, [methods.watch("departureCountry")]);

  const onSubmit = async (data: CargoShipment) => {
    try {
      const res = await createCargoForCurrentUser(data);
      if (res.success) {
        alert(t("a.Cargo_created_successfully"));
      } else {
        alert(t("a.There_was_an_error_on_creating_cargo"));
      }
    } catch (e) {
      alert(t("a.There_was_an_error_on_creating_cargo"));
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ margin: "20px" }}>
        {t("a.Add_your_cargo_detail")}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            gap="1rem"
            sx={{ "&>*": { width: "100%" } }}
          >
            <RHFAutocomplete
              sx={{ width: "100%" }}
              options={countries}
              name="departureCountry"
              label={t("a.Departure_country")}
            />
            {!!departureCities?.length && (
              <RHFAutocomplete
                onInputChange={(a, b) =>
                  b === "reset" || b === "clear"
                    ? setCitiesFilter("")
                    : setCitiesFilter(b)
                }
                inputValue={citiesFilter}
                options={departureCities}
                renderOption={(a, value) => (
                  <ListItem>{value.cityAscii}</ListItem>
                )}
                onChange={(a, b) => a}
                name="departureCity"
              />
            )}
            <RHFTextField
              name="destinationCountry"
              label={t("a.Destination_country")}
            />
            <RHFTextField
              name="destinationCity"
              label={t("a.Destination_City")}
            />
            <RHFTextField
              name="cargoDescription"
              label={t("a.Cargo_Description")}
            />
            <RHFTextField
              name="estimatedCost"
              label={t("a.Estimated_cost_(optional)")}
            />
            <RHFDatePicker
              sx={{ width: "100%" }}
              name="approximateDateTime"
              label={t("a.Approximate_DateTime")}
            />
            <RHFCheckbox
              name="immediateDelivery"
              label={t("a.Immediate_delivery")}
            />
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {t("a.Submit")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default FlightForm;
