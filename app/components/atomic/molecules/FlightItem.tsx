import { formatDate, formatTime } from "@/helpers/formatDate";
import { useScopedI18n } from "@/locales/client";
import { GetFlightsResponseData } from "@/types/apis/flights";
import { ArrowDropDownTwoTone } from "@mui/icons-material";
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
import Image from "next/image";
import { FunctionComponent, useState } from "react";

interface FlightItemProps {
  flight: GetFlightsResponseData;
}

const FlightItem: FunctionComponent<FlightItemProps> = ({ flight }) => {
  const t = useScopedI18n("flightItem");
  const [showCompleteDetails, setShowCompleteDetails] = useState(false);

  const toggleShowCompleteDetails = () =>
    setShowCompleteDetails((prev) => !prev);

  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" width="100%" gap={1} textAlign="center">
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
            <Typography textAlign="center">
              {flight.departureAirport.city.country.name} -{" "}
              {flight.departureAirport.city.name}
            </Typography>
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
            <Typography>
              {flight.destinationAirport.city.country.name} -{" "}
              {flight.destinationAirport.city.name}{" "}
            </Typography>
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
