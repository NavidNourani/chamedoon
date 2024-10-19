import RHFAutocomplete from "@/components/shared/RHF/RHFAutocomplete";
import { RHFSelect } from "@/components/shared/RHF/RHFSelect";
import { useScopedI18n } from "@/locales/client";
import { Close } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    MenuItem,
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
  countries: Country[] | undefined;
  methods: UseFormReturn<any>;
}

const FilterModal = ({
  isOpen,
  onClose,
  countries,
  methods,
}: FilterModalProps) => {
  const parcelsPageT = useScopedI18n("parcelsPage");
  const addParcelT = useScopedI18n("add_parcel");
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
          {parcelsPageT("filter_parcels")}
        </Typography>
        <form>
          <Stack spacing={2}>
            <RHFAutocomplete<Country, false, true, false>
              options={countries ?? []}
              getOptionLabel={(option) => option?.name ?? ""}
              name="departureCountry"
              label={addParcelT("Departure_country")}
            />
            <RHFAutocomplete<Country, false, true, false>
              options={countries ?? []}
              getOptionLabel={(option) => option?.name ?? ""}
              name="destinationCountry"
              label={addParcelT("Destination_country")}
            />
            <RHFSelect name="parcelType" label={addParcelT("Parcel_Type")}>
              <MenuItem value="all">{parcelsPageT("all")}</MenuItem>
              <MenuItem value="Document">{parcelsPageT("document")}</MenuItem>
            </RHFSelect>
            <Button variant="contained" onClick={onClose}>
              {parcelsPageT("close")}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default memo(FilterModal);
