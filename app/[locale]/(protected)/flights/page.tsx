"use client";
import FilterButtons from "@/app/components/flights/FilterButtons";
import FilterModal from "@/app/components/flights/FilterModal";
import FlightList from "@/app/components/flights/FlightList";
import useGetInfiniteFlights from "@/hooks/useGetInfiniteFlights";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { GetFlightsResponseData } from "@/types/apis/flights";
import { Container, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const normalizeFilters = (filters: any) => {
  const { departureCountry, destinationCountry, ...rest } = filters;
  return {
    ...(departureCountry && { departureCountryId: departureCountry?.id }),
    ...(destinationCountry && { destinationCountryId: destinationCountry?.id }),
    ...rest,
  };
};

export default function FlightsPage() {
  const flightsPageT = useScopedI18n("flightsPage");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      departureCountry: null,
      destinationCountry: null,
    },
  });
  const { watch, reset } = methods;
  const { countries } = useLocations();

  const filters = watch();
  const activeFiltersCount = Object.keys(normalizeFilters(filters)).length;

  const {
    data: paginatedFlights,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useGetInfiniteFlights({ filters: normalizeFilters(filters) });

  const flights = useMemo(
    () =>
      paginatedFlights?.pages.reduce<GetFlightsResponseData[]>(
        (acc, cur) => [...acc, ...cur.data],
        []
      ),
    [paginatedFlights?.pages]
  );

  const handleOpenFilterModal = useCallback(
    () => setIsFilterModalOpen(true),
    []
  );
  const handleCloseFilterModal = useCallback(
    () => setIsFilterModalOpen(false),
    []
  );
  const handleClearFilters = useCallback(() => {
    reset({
      departureCountry: null,
      destinationCountry: null,
    });
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <Container sx={{ height: "100%", overflow: "auto" }}>
        <Stack direction="row" gap={2} width="100%">
          <Stack width="100%" flexWrap="wrap">
            <Typography variant="h1" mb="36px" textAlign="center">
              {flightsPageT("flights")}
            </Typography>
            <FilterButtons
              onOpenFilterModal={handleOpenFilterModal}
              onClearFilters={handleClearFilters}
              activeFiltersCount={activeFiltersCount}
            />
            <FlightList
              isLoading={isLoading}
              flights={flights}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          </Stack>
        </Stack>
      </Container>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        countries={countries}
        methods={methods}
      />
    </FormProvider>
  );
}
