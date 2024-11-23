import { formatDate, formatTime } from "@/helpers/formatDate";
import { getTranslation } from "@/helpers/getTranslation";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { GetFlightsResponseData } from "@/types/apis/flights";
import { ArrowDropDownTwoTone, FlightTakeoff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useMemo, useState } from "react";

interface FlightItemProps {
  flight: GetFlightsResponseData;
}

const FlightItem: FunctionComponent<FlightItemProps> = ({ flight }) => {
  const t = useScopedI18n("flightItem");
  const locale = useCurrentLocale();
  const [showCompleteDetails, setShowCompleteDetails] = useState(false);
  const { data: session } = useSession();

  const isCurrentUserFlight = useMemo(() => {
    return flight.userID === session?.user.id;
  }, [flight.userID, session?.user.id]);

  const toggleShowCompleteDetails = () =>
    setShowCompleteDetails((prev) => !prev);

  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="column" width="100%" gap={1} textAlign="center">
          <Stack width="100%" direction="row" gap={1} position="relative">
            <Stack width="50%" gap={1} alignItems={"center"}>
              <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                {t("departure")}
              </Typography>
              <StyledImage
                width={140}
                height={100}
                src={`https://flagpedia.net/data/flags/w702/${flight.departureAirport.city.country.iso2?.toLocaleLowerCase()}.webp`}
                alt={flight.departureAirport.city.country.name}
              />
            </Stack>
            <Stack width="50%" gap={1} alignItems={"center"}>
              <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                {t("destination")}
              </Typography>
              <StyledImage
                width={140}
                height={100}
                src={`https://flagpedia.net/data/flags/w702/${flight.destinationAirport.city.country.iso2?.toLocaleLowerCase()}.webp`}
                alt={flight.destinationAirport.city.country.name}
              />
            </Stack>
            <FlightTakeoff
              sx={{
                fontSize: 40,
                position: "absolute",
                left: "50%",
                transform: (theme) =>
                  `translateX(-50%) ${
                    theme.direction === "rtl" ? "scaleX(-1)" : ""
                  }`,
                bottom: "0",
                filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 1))",
                color: "primary.main",
              }}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Stack width="50%" gap={1} alignItems={"center"}>
              <Typography textAlign="center">
                {flight.departureAirport.city.country.name} -{" "}
                {flight.departureAirport.city.name}
              </Typography>
            </Stack>
            <Stack width="50%" gap={1} alignItems={"center"}>
              <Typography>
                {flight.destinationAirport.city.country.name} -{" "}
                {flight.destinationAirport.city.name} (
                {flight.destinationCity.name})
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        {showCompleteDetails && (
          <>
            <Typography sx={{ alignSelf: "center" }}>
              {t("flight_details")}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>{t("departure_date")}</TableCell>
                    <TableCell>
                      {formatDate("jalali", flight.departureDateTime)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("departure_hour")}</TableCell>
                    <TableCell>
                      {formatTime("jalali", flight.departureDateTime)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("departure_hour")}</TableCell>
                    <TableCell>
                      {formatTime("jalali", flight.departureDateTime)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("phone")}</TableCell>
                    <TableCell dir="ltr">
                      <a
                        href={`tel:+${
                          flight.user.countryCode! + flight.user.phone!
                        }`}
                      >
                        +{flight.user.countryCode} {flight.user.phone}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("arrival_date")}</TableCell>
                    <TableCell>
                      {formatDate("jalali", flight.arrivalDateTime)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("arrival_hour")}</TableCell>
                    <TableCell>
                      {formatTime("jalali", flight.arrivalDateTime)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("destination_city")}</TableCell>
                    <TableCell>
                      {getTranslation(flight.destinationCity, locale)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("acceptable_parcel_description")}</TableCell>
                    <TableCell>{flight.acceptableParcelDescription}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Button
          endIcon={
            <ArrowDropDownTwoTone
              sx={{
                transform: showCompleteDetails ? "rotate(180deg)" : undefined,
              }}
            />
          }
          variant="outlined"
          color="primary"
          onClick={toggleShowCompleteDetails}
        >
          {showCompleteDetails
            ? t("show_less_details")
            : t("show_complete_details")}
        </Button>

        {isCurrentUserFlight && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Link href={`/app/addFlight?flightID=${flight.id}`}>
              <Button variant="contained" color="secondary">
                {t("edit")}
              </Button>
            </Link>
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              {t("your_flight")}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

const StyledImage = styled(Image)({
  objectFit: "cover",
  width: "100%",
  aspectRatio: "256/136",
  height: "auto",
  borderRadius: "4px",
});

export default FlightItem;
