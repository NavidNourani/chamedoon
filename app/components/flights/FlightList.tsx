"use client";
import { useScopedI18n } from "@/locales/client";
import { GetFlightsResponseData } from "@/types/apis/flights";
import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";
import ReactSign from "react-sign";
import FlightItem from "../atomic/molecules/FlightItem";
import FlightItemSkeleton from "../atomic/molecules/FlightItemSkeleton";

interface FlightListProps {
  isLoading: boolean;
  flights: GetFlightsResponseData[] | undefined;
  hasNextPage?: boolean | undefined;
  fetchNextPage?: () => void;
}

const FlightList = ({
  isLoading,
  flights,
  hasNextPage,
  fetchNextPage,
}: FlightListProps) => {
  const flightsPageT = useScopedI18n("flightsPage");

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!flights || flights.length === 0) {
    return new Array(12).fill(null).map((_, index) => (
      <FlightItemSkeleton key={index} />
    ));
  }

  return (
    <Box
      gap={2}
      sx={{
        overflow: "auto",
        display: "grid",
        gap: 2,
        width: "100%",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
      }}
    >
      {" "}
      {flights.map((flight) => (
        <FlightItem key={flight.id} flight={flight} />
      ))}
      {hasNextPage && <ReactSign onEnter={fetchNextPage} />}
    </Box>
  );
};

export default memo(FlightList);
