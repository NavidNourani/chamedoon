import { formatDate } from "@/helpers/formatDate";
import { useScopedI18n } from "@/locales/client";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import {
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
import { FunctionComponent } from "react";

interface ParcelItemProps {
  parcel: GetParcelsResponseData;
}

const ParcelItem: FunctionComponent<ParcelItemProps> = ({ parcel }) => {
  const t = useScopedI18n("parcelItem");

  return (
    <Card sx={{}}>
      <CardContent sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" width="100%" gap={1}>
          <Stack width="50%" gap={1} alignItems={"center"}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              {t("departure")}
            </Typography>
            <StyledImage
              width={140}
              height={100}
              src={`https://flagpedia.net/data/flags/w702/${parcel.departureAirport.city.country.iso2?.toLocaleLowerCase()}.webp`}
              alt={parcel.departureAirport.city.country.name}
            />
            <Typography textAlign="center">
              {parcel.departureAirport.city.country.name} -{" "}
              {parcel.departureAirport.city.name}
            </Typography>
          </Stack>
          <Stack width="50%" gap={1} alignItems={"center"}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              {t("destination")}
            </Typography>
            <StyledImage
              width={140}
              height={100}
              src={`https://flagpedia.net/data/flags/w702/${parcel.destinationAirport.city.country.iso2?.toLocaleLowerCase()}.webp`}
              alt={parcel.destinationAirport.city.country.name}
            />
            <Typography>
              {parcel.destinationAirport.city.country.name} -{" "}
              {parcel.destinationAirport.city.name}{" "}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Typography sx={{ alignSelf: "center" }}>
          {t("parcel_details")}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {parcel.parcelDescription && (
                <TableRow>
                  <TableCell>{t("parcel_description")}</TableCell>
                  <TableCell>{parcel.parcelDescription}</TableCell>
                </TableRow>
              )}
              {parcel.approximateDateTime && (
                <TableRow>
                  <TableCell>{t("approximate_date_time")}</TableCell>
                  <TableCell>
                    {formatDate("jalali", parcel.approximateDateTime)}
                  </TableCell>
                </TableRow>
              )}
              {parcel.parcelType && (
                <TableRow>
                  <TableCell>{t("parcel_type")}</TableCell>
                  <TableCell>{parcel.parcelType}</TableCell>
                </TableRow>
              )}
              {parcel.parcelWeight && (
                <TableRow>
                  <TableCell>{t("parcel_weight")}</TableCell>
                  <TableCell>{parcel.parcelWeight}</TableCell>
                </TableRow>
              )}
              {parcel.estimatedCost && (
                <TableRow>
                  <TableCell>{t("estimated_cost")}</TableCell>
                  <TableCell>{parcel.estimatedCost}</TableCell>
                </TableRow>
              )}
              {parcel.immediateDelivery && (
                <TableRow>
                  <TableCell>{t("immediate_delivery")}</TableCell>
                  <TableCell>{parcel.immediateDelivery}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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

export default ParcelItem;
