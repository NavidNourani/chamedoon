import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import RHFDateTimePicker from "@/components/shared/RHF/RHFDateTimePicker";
import { getTranslation } from "@/helpers/getTranslation";
import useLocations from "@/hooks/useLocations";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import {
  AirportWithTranslations,
  CityWithTranslations,
  CountryWithTranslations,
} from "@/types/models";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DestinationStep = () => {
  const {
    countries,
    getAirports,
    getCities,
    countriesLoading,
    airportsLoading,
    citiesLoading,
  } = useLocations();
  const [destinationAirports, setDestinationAirports] = useState<
    AirportWithTranslations[]
  >([]);
  const [destinationCities, setDestinationCities] = useState<
    CityWithTranslations[]
  >([]);
  const { watch, setValue, getValues } = useFormContext();
  const t = useScopedI18n("add_flight");
  const locale = useCurrentLocale();

  console.log("destinationCities", destinationCities);
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
            setDestinationAirports(airports as AirportWithTranslations[]);
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
            setDestinationCities(cities as CityWithTranslations[]);
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
      <RHFAutocomplete<CountryWithTranslations, false, true, false>
        options={countries ?? []}
        getOptionLabel={(option) => getTranslation(option, locale) ?? ""}
        name="destinationCountry"
        label={t("Destination_country")}
        loading={countriesLoading}
      />
      {!!destinationAirports.length && (
        <RHFAutocomplete<AirportWithTranslations, false, true, false>
          options={destinationAirports ?? []}
          getOptionLabel={(option) => getTranslation(option, locale) ?? ""}
          name="destinationAirport"
          label={t("Destination_Airport")}
          disableClearable
          loading={airportsLoading}
        />
      )}
      {!!destinationAirports.length && (
        <RHFAutocomplete<CityWithTranslations, false, true, false>
          options={destinationCities ?? []}
          getOptionLabel={(option) => getTranslation(option, locale) ?? ""}
          name="destinationCity"
          label={t("Destination_City")}
          disableClearable
          loading={citiesLoading}
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
