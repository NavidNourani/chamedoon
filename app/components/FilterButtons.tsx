import { useScopedI18n } from "@/locales/client";
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
  const parcelsPageT = useScopedI18n("parcelsPage");
  return (
    <Stack direction="row" gap="12px" mb={2}>
      <Button variant="contained" onClick={onOpenFilterModal}>
        {parcelsPageT("filters")}{" "}
        {!!activeFiltersCount && `(${activeFiltersCount})`}
      </Button>
      {activeFiltersCount > 0 && (
        <Button variant="outlined" onClick={onClearFilters}>
          {parcelsPageT("clear_all")}
        </Button>
      )}
    </Stack>
  );
};

export default memo(FilterButtons);
