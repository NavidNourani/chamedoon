import RHFCheckbox from "@/components/shared/RHF/RHFCheckbox";
import RHFDatePicker from "@/components/shared/RHF/RHFDatePicker";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { useScopedI18n } from "@/locales/client";
import { Grid } from "@mui/material";

const CargoDetailsStep = () => {
  const t = useScopedI18n("add_cargo");

  return (
    <Grid container spacing={2} gap="1rem" sx={{ "&>*": { width: "100%" } }}>
      <RHFTextField name="cargoDescription" label={t("Cargo_Description")} />
      <RHFTextField
        type="number"
        name="estimatedCost"
        label={t("Estimated_cost_(optional)")}
      />
      <RHFDatePicker
        sx={{ width: "100%" }}
        name="approximateDateTime"
        label={t("Approximate_DateTime_optional")}
      />
      <RHFCheckbox name="immediateDelivery" label={t("Immediate_delivery")} />
    </Grid>
  );
};

export default CargoDetailsStep;
