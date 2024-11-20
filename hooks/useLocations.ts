import { Airport, City, Country, Translations } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const useLocations = () => {
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [debouncedCountrySearchTerm] = useDebounce(countrySearchTerm, 500);

  const [citySearchTerm, setCitySearchTerm] = useState("");

  const { data: countriesData, isLoading: countriesLoading } = useQuery<
    (Country & { translations: Translations })[]
  >({
    queryKey: ["countries", debouncedCountrySearchTerm],
    queryFn: () =>
      axios
        .get(`/api/v1/locations/countries`, {
          params: debouncedCountrySearchTerm
            ? { search: debouncedCountrySearchTerm }
            : undefined,
        })
        .then((x) => x.data),
  });

  const { mutateAsync: getAirports, isPending: airportsLoading } = useMutation<
    (Airport & { translations: Translations })[],
    Error,
    { countryId: string }
  >({
    mutationFn: ({ countryId }: { countryId: string }) =>
      axios
        .get<(Airport & { translations: Translations })[]>(
          `/api/v1/locations/airports?countryId=${countryId}`
        )
        .then((x) => x.data),
  });

  const { mutateAsync: getCities, isPending: citiesLoading } = useMutation<
    (City & { translations: Translations })[],
    Error,
    { countryId: string }
  >({
    mutationFn: ({ countryId }: { countryId: string }) =>
      axios
        .get<(City & { translations: Translations })[]>(
          `/api/v1/locations/cities?countryId=${countryId}`
        )
        .then((x) => x.data),
  });

  return {
    countries: countriesData,
    countriesLoading,
    getAirports,
    airportsLoading,
    getCities,
    citiesLoading,
    setCountrySearchTerm,
    setCitySearchTerm,
  };
};

export default useLocations;
