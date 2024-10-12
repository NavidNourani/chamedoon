"use client";
import { PaginatedResponse } from "@/types/apis/general";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent, useMemo } from "react";
import ReactSign from "react-sign";
import ParcelItem from "../molecules/ParcelItem";

interface Props {}

const PaginatedParcelsList: FunctionComponent<Props> = ({}) => {
  const {
    data: paginatedParcels,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PaginatedResponse<GetParcelsResponseData>>({
    queryKey: ["all-parcels"],
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
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
      }}
    >
      {parcels?.map((item) => (
        <ParcelItem key={item.id} parcel={item} />
      ))}
      {hasNextPage && <ReactSign onEnter={fetchNextPage} />}
    </Box>
  );
};

export default PaginatedParcelsList;
