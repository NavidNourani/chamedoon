"use client";

import { useScopedI18n } from "@/locales/client";
import { createOrUpdateFlightForCurrentUser } from "@/serverActions/createOrUpdateFlightForCurrentUser";
import { GetFlightResponseData } from "@/types/apis/flights";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { Flight } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import DepartureStep from "./steps/DepartureStep";
import DestinationStep from "./steps/DestinationStep";
import FlightDetailsStep from "./steps/FlightDetailsStep";

const schema = yup.object().shape({
  departureDateTime: yup.date().required("Departure date and time is required"),
  arrivalDateTime: yup.date().required("Arrival date and time is required"),
  acceptableParcelDescription: yup
    .string()
    .required("Cargo description is required"),
  estimatedCost: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .optional(),
  departureAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Departure Airport is required"),
  departureCountry: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Departure Country is required"),
  destinationAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination Airport is required"),
  destinationCountry: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination Country is required"),
  destinationCity: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination City is required"),
});

const FlightForm = () => {
  const theme = useTheme();
  const t = useScopedI18n("add_flight");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const flightID = useMemo(() => searchParams.get("flightID"), [searchParams]);

  const { data: flight } = useQuery<GetFlightResponseData>({
    queryKey: ["flights", flightID],
    queryFn: () =>
      axios.get(`/api/v1/flights/${flightID}`).then((res) => res.data),
    enabled: !!flightID,
  });
  const methods = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      departureDateTime: new Date(),
      arrivalDateTime: new Date(),
      acceptableParcelDescription: "",
      estimatedCost: undefined,
      departureCountry: undefined,
      destinationCountry: undefined,
      destinationCity: undefined,
    },
  });

  useEffect(() => {
    if (flight) {
      methods.reset({
        departureDateTime: flight.departureDateTime,
        arrivalDateTime: flight.arrivalDateTime,
        acceptableParcelDescription: flight.acceptableParcelDescription,
        estimatedCost: flight.estimatedCost,
        departureAirport: flight.departureAirport,
        destinationAirport: flight.destinationAirport,
        departureCountry: flight.departureAirport.city.country,
        destinationCountry: flight.destinationAirport.city.country,
        destinationCity: flight.destinationAirport.city,
      });
    } else {
      methods.reset({
        departureDateTime: new Date(),
        arrivalDateTime: new Date(),
        acceptableParcelDescription: "",
        estimatedCost: undefined,
      });
    }
  }, [flight, flightID, methods]);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const dataToSend: Omit<Flight, "userID" | "id"> &
        Partial<Pick<Flight, "id">> = {
        id: flightID ?? undefined,
        departureDateTime: data.departureDateTime,
        arrivalDateTime: data.arrivalDateTime,
        acceptableParcelDescription: data.acceptableParcelDescription,
        estimatedCost: data.estimatedCost ?? null,
        departureAirportId: data.departureAirport.id,
        destinationAirportId: data.destinationAirport.id,
        destinationCityId: data.destinationCity.id,
      };
      const res = await createOrUpdateFlightForCurrentUser(dataToSend);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["flights"], exact: false });
        enqueueSnackbar(
          flightID
            ? t("Flight_updated_successfully")
            : t("Flight_created_successfully"),
          {
            variant: "success",
          }
        );
        router.push("/app");
      } else {
        enqueueSnackbar(t("There_was_an_error_on_creating_flight"), {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar(t("There_was_an_error_on_creating_flight"), {
        variant: "error",
      });
    }
  };

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Define fields to validate for each step
    const fieldsToValidate = {
      0: ["departureDateTime", "departureAirport", "departureCountry"],
      1: [
        "arrivalDateTime",
        "destinationAirport",
        "destinationCountry",
        "destinationCity",
      ],
      2: ["acceptableParcelDescription", "estimatedCost"],
    }[step];

    // Validate only the fields for the current step
    const isStepValid = await methods.trigger(fieldsToValidate as any);

    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setStep((prev) => prev - 1);

  useEffect(() => {
    methods.clearErrors();
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <DepartureStep />;
      case 1:
        return <DestinationStep />;
      case 2:
        return <FlightDetailsStep />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        top: "50%",
        left: "50%",
        borderRadius: 3,
        position: "absolute",
        transform: "translate(-50%, -50%)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.5)"
            : "0px 4px 10px rgba(0, 0, 0, 0.5)",
      }}
      width="min(80%, 900px)"
      height="min(70%, 600px)"
      overflow="hidden"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image
            src="/images/sending.jpg"
            alt="Airplane"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <FormProvider {...methods}>
            <Stack
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              height="100%"
              width="100%"
              overflow="hidden"
            >
              <Stack height="100%" overflow="auto" gap={3} width="100%" p={4}>
                {renderStep()}
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    {t("Back")}
                  </Button>
                  {step < 2 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      type="button"
                    >
                      {t("Next")}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      // Remove any onClick that might interfere with submission
                    >
                      {t("Submit")}
                    </Button>
                  )}
                </Box>
              </Stack>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightForm;
