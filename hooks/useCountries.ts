import { useI18n } from "@/locales/client";
import { getAllCitiesOfACountryAction } from "@/serverActions/citiesAndCountries/getAllCitiesOfACountryAction";
import { TCountry } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCountries = () => {
  const t = useI18n();
  const { data: countriesData } = useQuery<TCountry[]>({
    queryKey: ["countries"],
    queryFn: () =>
      axios
        .get("https://api.countrystatecity.in/v1/countries", {
          headers: {
            "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY,
          },
        })
        .then((x) => x.data),
  });
  const getCities = async (countryCode: string) => {
    const cities = await getAllCitiesOfACountryAction(countryCode);
    return cities;
  };

  return { countries: countriesData, getCities };
};

export default useCountries;
