"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CargoShipment } from "@prisma/client";
import { useScopedI18n } from "@/locales/client";
import { createCargoForCurrentUser } from "@/serverActions/createCargoForCurrentUser";
import DepartureStep from "./steps/DepartureStep";
import DestinationStep from "./steps/DestinationStep";
import CargoDetailsStep from "./steps/CargoDetailsStep";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  approximateDateTime: yup.date().optional(),
  immediateDelivery: yup.boolean().required(),
  departureCountry: yup
    .object({
      id: yup.string().required(),
      iso2: yup.string().required(),
      iso3: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Departure country is required"),
  departureAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      countryIso2: yup.string().required(),
    })
    .required("Departure Airport is required"),
  destinationCountry: yup
    .object({
      id: yup.string().required(),
      iso2: yup.string().required(),
      iso3: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination country is required"),
  destinationAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      countryIso2: yup.string().required(),
    })
    .required("Destination Airport is required"),
  cargoDescription: yup.string().required(),
  estimatedCost: yup.number().optional(),
});

const FlightForm = () => {
  const t = useScopedI18n("add_cargo");
  const methods = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema) as any,
  });
  const [step, setStep] = useState(0);

  // Add this useEffect hook to reset the form data
  useEffect(() => {
    methods.reset({
      immediateDelivery: false,
      cargoDescription: "",
      estimatedCost: undefined,
      approximateDateTime: undefined,
    });
  }, [methods]);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const dataToSend: Omit<CargoShipment, "userID" | "id"> = {
        departureAirportId: data.departureAirport.id,
        destinationAirportId: data.destinationAirport.id,
        cargoDescription: data.cargoDescription,
        estimatedCost: data.estimatedCost ?? null,
        immediateDelivery: data.immediateDelivery,
        approximateDateTime: data.approximateDateTime ?? null,
        cargoWeight: null,
        cargoType: null,
      };
      const res = await createCargoForCurrentUser(dataToSend);
      if (res.success) {
        alert(t("Cargo_created_successfully"));
      } else {
        alert(t("There_was_an_error_on_creating_cargo"));
      }
    } catch (e) {
      alert(t("There_was_an_error_on_creating_cargo"));
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <DepartureStep />;
      case 1:
        return <DestinationStep />;
      case 2:
        return <CargoDetailsStep />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minWidth: "400px",
        width: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ margin: "20px" }}>
        {t("Add_your_cargo_detail")}
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          {renderStep()}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "end",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              disabled={step === 0}
            >
              {t("Back")}
            </Button>
            {step < 2 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                {t("Next")}
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                {t("Submit")}
              </Button>
            )}
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default FlightForm;
