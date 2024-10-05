import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import { Grid } from "@mui/material";
import { Country, City } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";

const DestinationStep = () => {
  const { countries, getCities } = useLocations();
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const { watch, setValue } = useFormContext();
  const t = useScopedI18n("add_cargo");

  useEffect(() => {
    if (countries && countries.length > 0) {
      setValue("destinationCountry", countries[0]);
    }
  }, [countries, setValue]);

  useEffect(() => {
    if (watch("destinationCountry")) {
      getCities({ countryId: watch("destinationCountry").id }).then(
        (cities) => {
          if (cities && cities.length > 0) {
            setDestinationCities(cities as City[]);
            setValue("destinationAirport", cities[0]);
          }
        }
      );
    }
  }, [watch("destinationCountry"), getCities, setValue]);

  return (
    <Grid container spacing={2} gap="1rem" sx={{ "&>*": { width: "100%" } }}>
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
    </Grid>
  );
};

export default DestinationStep;
