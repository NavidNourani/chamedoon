import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import RHFDateTimePicker from "@/components/shared/RHF/RHFDateTimePicker";
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
  const { getValues, setValue, watch } = useFormContext();
  const locale = useCurrentLocale();
  const t = useScopedI18n("add_flight");

  // Select first country from countries list if departureCountry is not selected
  useEffect(() => {
    if (countries && countries.length > 0) {
      !getValues("departureCountry") &&
        setValue("departureCountry", countries[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, setValue]);

  // Select first airport from airports list if
  // departureAirport is not selected or if the selected airport is not in the list
  useEffect(() => {
    if (getValues("departureCountry")) {
      getAirports({ countryId: getValues("departureCountry").id }).then(
        (airports) => {
          if (airports && airports.length > 0) {
            setDepartureAirports(airports as AirportWithTranslations[]);
            if (
              !getValues("departureAirport") ||
              !airports.find(
                (city) => city.id === getValues("departureAirport").id
              )
            ) {
              setValue("departureAirport", airports[0]);
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
        getOptionLabel={(option) => getTranslation(option, locale) ?? ""}
        name="departureCountry"
        label={t("Departure_country")}
        disableClearable
        loading={countriesLoading}
      />
      {!!departureAirports.length && (
        <RHFAutocomplete<AirportWithTranslations, false, true, false>
          sx={{ width: "100%" }}
          options={departureAirports ?? []}
          getOptionLabel={(option) => getTranslation(option, locale) ?? ""}
          name="departureAirport"
          label={t("Departure_Airport")}
          disableClearable
          loading={airportsLoading}
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
