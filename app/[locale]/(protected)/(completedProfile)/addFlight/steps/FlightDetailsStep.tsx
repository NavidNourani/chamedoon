import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { useScopedI18n } from "@/locales/client";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const FlightDetailsStep = () => {
  const t = useScopedI18n("add_flight");
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
        {t("Flight_details")}
      </Typography>
      <RHFTextField
        type="number"
        name="estimatedCost"
        label={t("Estimated_cost_(optional)")}
      />
      <RHFTextField
        name="acceptableParcelDescription"
        label={t("Acceptable_Parcel_Description")}
      />
    </>
  );
};

export default FlightDetailsStep;
