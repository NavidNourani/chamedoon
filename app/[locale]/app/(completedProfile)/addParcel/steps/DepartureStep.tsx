import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import { getTranslation } from "@/helpers/getTranslation";
import useLocations from "@/hooks/useLocations";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import {
  AirportWithTranslations,
  CountryWithTranslations,
} from "@/types/models";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DepartureStep = () => {
  const { countries, getAirports, countriesLoading, airportsLoading } =
    useLocations();
  const [departureAirports, setDepartureAirports] = useState<
    AirportWithTranslations[]
  >([]);
  const { watch, setValue, getValues } = useFormContext();
  const t = useScopedI18n("add_parcel");
  const locale = useCurrentLocale();

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
            setDepartureAirports(cities as AirportWithTranslations[]);
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
      <RHFAutocomplete<CountryWithTranslations, false, true, false>
        sx={{ width: "100%" }}
        options={countries ?? []}
        getOptionLabel={(option) => getTranslation(option, locale)}
        name="departureCountry"
        label={t("Departure_country")}
        disableClearable
        loading={countriesLoading}
      />
      <RHFAutocomplete<AirportWithTranslations, false, true, false>
        sx={{ width: "100%" }}
        options={departureAirports ?? []}
        getOptionLabel={(option) => getTranslation(option, locale)}
        name="departureAirport"
        label={t("Departure_Airport")}
        disableClearable
        loading={airportsLoading}
      />
    </>
  );
};

export default DepartureStep;
