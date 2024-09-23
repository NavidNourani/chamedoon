import { useI18n } from "@/locales/client";
import { City, Country } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const useLocations = () => {
  const t = useI18n();
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [debouncedCountrySearchTerm] = useDebounce(countrySearchTerm, 500);

  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [debouncedCitySearchTerm] = useDebounce(citySearchTerm, 500);

  const { data: countriesData, isLoading: countriesLoading } = useQuery<
    Country[]
  >({
    queryKey: ["countries", debouncedCountrySearchTerm],
    queryFn: () =>
      axios
        .get(`/api/v1/locations/countries`, {
          params: { search: debouncedCountrySearchTerm },
        })
        .then((x) => x.data),
  });

  const { data: citiesData, isLoading: citiesLoading } = useQuery<City[]>({
    queryKey: ["cities", debouncedCitySearchTerm],
    queryFn: () =>
      axios
        .get(`/api/v1/locations/cities`, {
          params: { search: debouncedCitySearchTerm },
        })
        .then((x) => x.data),
  });

  const { mutateAsync: getAirports } = useMutation<
    City[],
    Error,
    { countryId: string }
  >({
    mutationFn: ({ countryId }: { countryId: string }) =>
      axios
        .get<City[]>(`/api/v1/locations/airports?countryId=${countryId}`)
        .then((x) => x.data),
  });

  return {
    countries: countriesData,
    countriesLoading,
    cities: citiesData,
    citiesLoading,
    getCities: getAirports,
    setCountrySearchTerm,
    setCitySearchTerm,
  };
};

export default useLocations;
