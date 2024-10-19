import { useScopedI18n } from "@/locales/client";
import { FilterList } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { memo } from "react";

interface FilterButtonsProps {
  onOpenFilterModal: () => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const FilterButtons = ({
  onOpenFilterModal,
  onClearFilters,
  activeFiltersCount,
}: FilterButtonsProps) => {
  const flightsPageT = useScopedI18n("flightsPage");

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Button
        variant="outlined"
        startIcon={<FilterList />}
        onClick={onOpenFilterModal}
      >
        {flightsPageT("filter")}
        {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
      </Button>
      {activeFiltersCount > 0 && (
        <Button variant="outlined" onClick={onClearFilters}>
          {flightsPageT("clear_filters")}
        </Button>
      )}
    </Stack>
  );
};

export default memo(FilterButtons);
