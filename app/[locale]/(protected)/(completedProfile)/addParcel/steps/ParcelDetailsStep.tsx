import RHFCheckbox from "@/components/shared/RHF/RHFCheckbox";
import RHFDatePicker from "@/components/shared/RHF/RHFDatePicker";
import { RHFSelect } from "@/components/shared/RHF/RHFSelect";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { useScopedI18n } from "@/locales/client";
import { MenuItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ParcelDetailsStep = () => {
  const t = useScopedI18n("add_parcel");
  const methods = useFormContext();
  useEffect(() => {
    methods.clearErrors();
  }, []);

  return (
    <>
      <Typography
        variant="h1"
        fontSize="2rem"
        textAlign="center"
        fontWeight="bold"
        mb="12px"
      >
        {t("Parcel_details")}
      </Typography>
      <RHFTextField name="parcelDescription" label={t("parcel_description")} />
      <RHFSelect name="parcelType" label={t("Parcel_Type")}>
        <MenuItem value="Document">{t("Document")}</MenuItem>
        <MenuItem value="Other">{t("Other")}</MenuItem>
      </RHFSelect>
      <RHFTextField
        type="number"
        name="parcelWeight"
        label={t("Parcel_Weight_grams")}
      />
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
    </>
  );
};

export default ParcelDetailsStep;
