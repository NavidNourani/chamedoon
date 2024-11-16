import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import RHFDateTimePicker from "@/components/shared/RHF/RHFDateTimePicker";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { Typography } from "@mui/material";
import { City, Country } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DestinationStep = () => {
  const { countries, getAirports, getCities } = useLocations();
  const [destinationAirports, setDestinationAirports] = useState<City[]>([]);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const { watch, setValue, getValues } = useFormContext();
  const t = useScopedI18n("add_flight");

  useEffect(() => {
    if (countries && countries.length > 0) {
      !getValues("destinationCountry") &&
        setValue("destinationCountry", countries[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  useEffect(() => {
    if (watch("destinationCountry")) {
      getAirports({ countryId: watch("destinationCountry").id }).then(
        (airports) => {
          if (airports && airports.length > 0) {
            setDestinationAirports(airports as City[]);
            if (
              !getValues("destinationAirport") ||
              !airports.find(
                (city) => city.id === getValues("destinationAirport").id
              )
            ) {
              setValue("destinationAirport", airports[0]);
            }
          }
        }
      );
      getCities({ countryId: watch("destinationCountry").id }).then(
        (cities) => {
          if (cities && cities.length > 0) {
            setDestinationCities(cities as City[]);
            if (
              !getValues("destinationCity") ||
              !cities.find(
                (city) => city.id === getValues("destinationCity").id
              )
            ) {
              setValue("destinationCity", cities[0]);
            }
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("destinationCountry")]);

  return (
    <>
      <Typography
        variant="h1"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
        mb="12px"
      >
        {t("destination_details")}
      </Typography>
      <RHFAutocomplete<Country, false, true, false>
        options={countries ?? []}
        getOptionLabel={(option) => option?.name ?? ""}
        name="destinationCountry"
        label={t("Destination_country")}
      />
      {!!destinationAirports.length && (
        <RHFAutocomplete<City, false, true, false>
          options={destinationAirports ?? []}
          getOptionLabel={(option) => option?.name ?? ""}
          name="destinationAirport"
          label={t("Destination_Airport")}
          disableClearable
        />
      )}
      {!!destinationAirports.length && (
        <RHFAutocomplete<City, false, true, false>
          options={destinationAirports ?? []}
          getOptionLabel={(option) => option?.name ?? ""}
          name="destinationCity"
          label={t("Destination_City")}
          disableClearable
        />
      )}
      <RHFDateTimePicker
        name="arrivalDateTime"
        label={t("Arrival_Date_and_Time")}
      />
    </>
  );
};

export default DestinationStep;
