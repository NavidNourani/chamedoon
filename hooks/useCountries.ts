import { getAllCitiesOfACountryAction } from "@/serverActions/citiesAndCountries/getAllCitiesOfACountryAction";
import { getAllCountriesAction } from "@/serverActions/citiesAndCountries/getAllCountriesAction";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

const useCountries = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    async function getCountries() {
      try {
        const countries = await getAllCountriesAction();
        setCountries(countries);
      } catch (e) {
        alert(t("a.There_was_an_error_on_getting_countries"));
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
      alert(t("a.there_was_an_error_on_getting_cities"));
      console.log(e);
      return;
    }
  }

  return { countries, getCities };
};

export default useCountries;
