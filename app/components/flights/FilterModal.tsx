import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import { useScopedI18n } from "@/locales/client";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Country } from "@prisma/client";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearFilters: () => void;
  countries: Country[] | undefined;
  methods: UseFormReturn<any>;
}

const FilterModal = ({
  isOpen,
  onClose,
  onClearFilters,
  countries,
  methods,
}: FilterModalProps) => {
  const flightsPageT = useScopedI18n("flightsPage");
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            minWidth: 0,
            padding: 0,
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" component="h2" mb={2}>
          {flightsPageT("filter_flights")}
        </Typography>
        <form>
          <Stack spacing={2}>
            <RHFAutocomplete<Country, false, true, false>
              options={countries ?? []}
              getOptionLabel={(option) => option?.name ?? ""}
              name="departureCountry"
              label={flightsPageT("departure_country")}
            />
            <RHFAutocomplete<Country, false, true, false>
              options={countries ?? []}
              getOptionLabel={(option) => option?.name ?? ""}
              name="destinationCountry"
              label={flightsPageT("destination_country")}
            />
            <Button variant="contained" onClick={onClearFilters}>
              {flightsPageT("clear_filters")}
            </Button>
            <Button variant="contained" type="submit" onClick={onClose}>
              {flightsPageT("apply_filters")}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default memo(FilterModal);
