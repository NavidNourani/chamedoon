import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { Typography } from "@mui/material";
import { City, Country } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DepartureStep = () => {
  const { countries, getAirports } = useLocations();
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const { watch, setValue, getValues } = useFormContext();
  const t = useScopedI18n("add_parcel");

  // Select first country from countries list if departureCountry is not selected
  useEffect(() => {
    if (countries && countries.length > 0) {
      !getValues("departureCountry") &&
      setValue("departureCountry", countries[0]);
    }
  }, [countries, setValue]);

  // Select first airport from airports list if
  // departureAirport is not selected or if the selected airport is not in the list
  useEffect(() => {
    if (getValues("departureCountry")) {
      getAirports({ countryId: getValues("departureCountry").id }).then(
        (cities) => {
          if (cities && cities.length > 0) {
            setDepartureCities(cities as City[]);
            if (
              !getValues("departureAirport") ||
              !cities.find(
                (city) => city.id === getValues("departureAirport").id
              )
            ) {
              setValue("departureAirport", cities[0]);
            }
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("departureCountry")]);

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
    </>
  );
};

export default DepartureStep;
