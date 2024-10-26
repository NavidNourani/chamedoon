"use client";
import FilterButtons from "@/app/components/FilterButtons";
import FilterModal from "@/app/components/FilterModal";
import ParcelList from "@/app/components/ParcelList";
import useGetInfiniteParcels from "@/hooks/useGetInfiniteParcels";
import useLocations from "@/hooks/useLocations";
import { useScopedI18n } from "@/locales/client";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { Container, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const normalizeFilters = (filters: any) => {
  const { departureCountry, destinationCountry, parcelType, ...rest } = filters;
  return {
    ...(departureCountry && { departureCountryId: departureCountry?.id }),
    ...(destinationCountry && { destinationCountryId: destinationCountry?.id }),
    ...(parcelType !== "all" && { parcelType }),
  };
};
export default function Home() {
  const parcelsPageT = useScopedI18n("parcelsPage");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      parcelType: "all",
      departureCountry: null,
      destinationCountry: null,
    },
  });
  const { watch, reset } = methods;
  const { countries } = useLocations();

  const filters = watch();
  const activeFiltersCount = Object.keys(normalizeFilters(filters)).length;

  const {
    data: paginatedParcels,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useGetInfiniteParcels({ filters: normalizeFilters(filters) });

  const parcels = useMemo(
    () =>
      paginatedParcels?.pages.reduce<GetParcelsResponseData[]>(
        (acc, cur) => [...acc, ...cur.data],
        []
      ),
    [paginatedParcels?.pages]
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
      parcelType: "all",
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
              {parcelsPageT("parcels")}
            </Typography>
            <FilterButtons
              onOpenFilterModal={handleOpenFilterModal}
              onClearFilters={handleClearFilters}
              activeFiltersCount={activeFiltersCount}
            />
            <ParcelList
              isLoading={isLoading}
              parcels={parcels}
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
