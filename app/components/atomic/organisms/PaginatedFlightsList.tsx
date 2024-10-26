"use client";
import { PaginatedResponse } from "@/types/apis/general";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent, useMemo } from "react";
import ReactSign from "react-sign";
import ParcelItem from "../molecules/ParcelItem";
import ParcelItemSkeleton from "../molecules/ParcelItemSkeleton";

interface Props {}

const PaginatedFlightsList: FunctionComponent<Props> = ({}) => {
  const {
    data: paginatedParcels,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery<PaginatedResponse<GetParcelsResponseData>>({
    queryKey: ["parcels"],
    queryFn: ({ pageParam }) =>
      axios
        .get("/api/v1/parcels", { params: { page: pageParam } })
        .then((x) => x.data),
    getNextPageParam: (lastPage) =>
      lastPage.page >= lastPage.totalPages ? lastPage.page + 1 : null,
    initialPageParam: 1,
  });

  const parcels = useMemo(
    () =>
      paginatedParcels?.pages.reduce<GetParcelsResponseData[]>(
        (acc, cur) => [...acc, ...cur.data],
        []
      ),
    [paginatedParcels?.pages]
  );

  return (
    <Box
      gap={2}
      sx={{
        overflow: "auto",
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
      }}
    >
      {isLoading &&
        new Array(12)
          .fill(0)
          .map((_, index) => <ParcelItemSkeleton key={index} />)}
      {parcels?.map((item) => (
        <ParcelItem key={item.id} parcel={item} />
      ))}
      {hasNextPage && <ReactSign onEnter={fetchNextPage} />}
    </Box>
  );
};

export default PaginatedFlightsList;
