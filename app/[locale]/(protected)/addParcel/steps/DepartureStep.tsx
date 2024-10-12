import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { City, Country } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DepartureStep = () => {
  const { countries, getAirports } = useLocations();
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const { watch, setValue } = useFormContext();
  const t = useScopedI18n("add_parcel");

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
<>      <RHFAutocomplete<Country, false, true, false>
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
