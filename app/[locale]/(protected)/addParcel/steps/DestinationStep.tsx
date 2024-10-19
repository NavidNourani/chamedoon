import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { Typography } from "@mui/material";
import { City, Country } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DestinationStep = () => {
  const { countries, getAirports } = useLocations();
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const { watch, setValue } = useFormContext();
  const t = useScopedI18n("add_parcel");

  useEffect(() => {
    if (countries && countries.length > 0) {
      setValue("destinationCountry", countries[0]);
    }
  }, [countries, setValue]);

  useEffect(() => {
    if (watch("destinationCountry")) {
      getAirports({ countryId: watch("destinationCountry").id }).then(
        (cities) => {
          if (cities && cities.length > 0) {
            setDestinationCities(cities as City[]);
            setValue("destinationAirport", cities[0]);
          }
        }
      );
    }
  }, [watch("destinationCountry"), getAirports, setValue]);

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
      {!!destinationCities.length && (
        <RHFAutocomplete<City, false, true, false>
          options={destinationCities ?? []}
          getOptionLabel={(option) => option?.name ?? ""}
          name="destinationAirport"
          label={t("Destination_Airport")}
          disableClearable
        />
      )}
    </>
  );
};

export default DestinationStep;
