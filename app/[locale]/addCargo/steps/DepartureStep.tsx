import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import { Grid } from "@mui/material";
import { Country, City } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";

const DepartureStep = () => {
  const { countries, getCities } = useLocations();
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const { watch, setValue } = useFormContext();
  const t = useScopedI18n("add_cargo");

  useEffect(() => {
    if (countries && countries.length > 0) {
      setValue("departureCountry", countries[0]);
    }
  }, [countries, setValue]);

  useEffect(() => {
    if (watch("departureCountry")) {
      getCities({ countryId: watch("departureCountry").id }).then((cities) => {
        if (cities && cities.length > 0) {
          setDepartureCities(cities as City[]);
          setValue("departureAirport", cities[0]);
        }
      });
    }
  }, [watch("departureCountry"), getCities, setValue]);

  return (
    <Grid container spacing={2} gap="1rem" sx={{ "&>*": { width: "100%" } }}>
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
    </Grid>
  );
};

export default DepartureStep;
