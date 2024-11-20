"use client";

import { useScopedI18n } from "@/locales/client";
import { createOrUpdateParcelForCurrentUser } from "@/serverActions/createOrUpdateParcelForCurrentUser";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { Parcel } from "@prisma/client";
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
import ParcelDetailsStep from "./steps/ParcelDetailsStep";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  approximateDateTime: yup.date().optional(),
  immediateDelivery: yup.boolean().required(),
  departureCountry: yup
    .object({
      id: yup.string().required(),
      iso2: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Departure country is required"),
  departureAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      countryIso2: yup.string().optional(),
    })
    .required("Departure Airport is required"),
  destinationCountry: yup
    .object({
      id: yup.string().required(),
      iso2: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination country is required"),
  destinationAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      countryIso2: yup.string().optional(),
    })
    .required("Destination Airport is required"),
  parcelDescription: yup.string().required(),
  estimatedCost: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .optional(),
  parcelWeight: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .required(),
  parcelType: yup.string().nullable().required(),
});

const ParcelForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useScopedI18n("add_parcel");
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();
  const parcelID = useMemo(() => searchParams.get("parcelID"), [searchParams]);

  const { data: parcel } = useQuery<GetParcelsResponseData>({
    queryKey: ["parcels", parcelID],
    queryFn: () =>
      axios.get(`/api/v1/parcels/${parcelID}`).then((res) => res.data),
    enabled: !!parcelID,
  });

  const methods = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      immediateDelivery: false,
      parcelDescription: "",
      estimatedCost: undefined,
      parcelType: "Document",
      approximateDateTime: new Date(),
    },
  });

  useEffect(() => {
    if (parcel) {
      methods.reset({
        immediateDelivery: parcel.immediateDelivery,
        parcelDescription: parcel.parcelDescription,
        estimatedCost: parcel.estimatedCost,
        approximateDateTime: parcel.approximateDateTime ?? undefined,
        parcelWeight: parcel.parcelWeight ?? undefined,
        parcelType: parcel.parcelType ?? undefined,
        departureCountry: parcel.departureAirport.city.country as any,
        departureAirport: parcel.departureAirport,
        destinationCountry: parcel.destinationAirport.city.country as any,
        destinationAirport: parcel.destinationAirport,
      });
    } else {
      methods.reset({
        immediateDelivery: false,
        parcelDescription: "",
        estimatedCost: undefined,
        parcelType: "Document",
        approximateDateTime: undefined,
      });
    }
  }, [methods, parcel]);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const dataToSend: Omit<Parcel, "userID" | "id"> &
        Partial<Pick<Parcel, "id">> = {
        id: parcelID ?? undefined,
        departureAirportId: data.departureAirport.id,
        destinationAirportId: data.destinationAirport.id,
        destinationCityId: data.destinationAirport.id,
        parcelDescription: data.parcelDescription,
        estimatedCost: data.estimatedCost ?? null,
        immediateDelivery: data.immediateDelivery,
        approximateDateTime: data.approximateDateTime ?? null,
        parcelWeight: data.parcelWeight ?? null,
        parcelType: data.parcelType ?? null,
      };
      const res = await createOrUpdateParcelForCurrentUser(dataToSend);

      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["parcels"], exact: false });
        enqueueSnackbar(
          parcelID
            ? t("Parcel_updated_successfully")
            : t("Parcel_created_successfully"),
          {
            variant: "success",
          }
        );

        router.push("/app");
      } else {
        enqueueSnackbar(t("There_was_an_error_on_creating_parcel"), {
          variant: "error",
        });
      }
    } catch (e) {
      console.log("error", e);
      enqueueSnackbar(t("There_was_an_error_on_creating_parcel"), {
        variant: "error",
      });
    }
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Define fields to validate for each step
    const fieldsToValidate = {
      0: ["departureCountry", "departureAirport"],
      1: ["destinationCountry", "destinationAirport", "destinationCity"],
      2: ["parcelDescription", "parcelWeight", "parcelType"],
    }[step];

    // Validate only the fields for current step
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
        return <ParcelDetailsStep />;
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
            : "0px 4px 10px rgba(0, 0, 0, 0.5)", // Conditional box shadow
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
            src="/images/woman.jpg"
            alt="Woman with parcel"
            layout="fill"
            objectFit="cover"
          />
          <Box
            sx={{ position: "absolute", bottom: 40, left: 40, color: "white" }}
          >
            {/* <Typography variant="h4" fontWeight="bold">
            {t("Ship_your_parcel")}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {t("Across_the_world")}
          </Typography> */}
          </Box>
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
                    <Button variant="contained" onClick={handleNext}>
                      {t("Next")}
                    </Button>
                  ) : (
                    <Button type="submit" variant="contained">
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

export default ParcelForm;
