import { useI18n } from "@/locales/client";
import { getAllCitiesOfACountryAction } from "@/serverActions/citiesAndCountries/getAllCitiesOfACountryAction";
import { getAllCountriesAction } from "@/serverActions/citiesAndCountries/getAllCountriesAction";
import { useEffect, useState } from "react";

const useCountries = () => {
  const t = useI18n();
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    async function getCountries() {
      try {
        const countries = await getAllCountriesAction();
        setCountries(countries);
      } catch (e) {
        alert(t("add_cargo.There_was_an_error_on_getting_countries"));
        console.log(e);
        setCountries([]);
        return;
      }
    }
    getCountries();
  });

  async function getCities(country: string) {
    try {
      const cities = await getAllCitiesOfACountryAction(country);
      return cities;
    } catch (e) {
      alert(t("add_cargo.there_was_an_error_on_getting_cities"));
      console.log(e);
      return;
    }
  }

  return { countries, getCities };
};

export default useCountries;
