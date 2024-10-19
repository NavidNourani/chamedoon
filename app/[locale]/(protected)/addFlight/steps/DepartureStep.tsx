import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import RHFDateTimePicker from "@/components/shared/RHF/RHFDateTimePicker";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { Typography } from "@mui/material";
import { City, Country } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DepartureStep = () => {
  const { countries, getAirports } = useLocations();
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const { watch, setValue } = useFormContext();
  const t = useScopedI18n("add_flight");

  useEffect(() => {
    if (countries && countries.length > 0) {
      setValue("departureCountry", countries[0]);
    }
  }, [countries, setValue]);

  useEffect(() => {
    if (watch("departureCountry")) {
      getAirports({ countryId: watch("departureCountry").id }).then(
        (cities) => {
          if (cities && cities.length > 0) {
            setDepartureCities(cities as City[]);
            setValue("departureAirport", cities[0]);
          }
        }
      );
    }
  }, [watch("departureCountry"), getAirports, setValue]);

  return (
    <>
      <Typography
        variant="h1"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
        mb="12px"
      >
        {t("departure_details")}
      </Typography>
      <RHFAutocomplete<Country, false, true, false>
        sx={{ width: "100%" }}
        options={countries ?? []}
        getOptionLabel={(option) => option?.name ?? ""}
        name="departureCountry"
        label={t("Departure_country")}
        disableClearable
      />
      {!!departureCities.length && (
        <RHFAutocomplete<City, false, true, false>
          sx={{ width: "100%" }}
          options={departureCities ?? []}
          getOptionLabel={(option) => option?.name ?? ""}
          name="departureAirport"
          label={t("Departure_Airport")}
          disableClearable
        />
      )}
      <RHFDateTimePicker
        name="departureDateTime"
        label={t("Departure_Date_and_Time")}
      />
    </>
  );
};

export default DepartureStep;
