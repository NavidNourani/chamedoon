import ParcelItem from "@/app/components/atomic/molecules/ParcelItem";
import ParcelItemSkeleton from "@/app/components/atomic/molecules/ParcelItemSkeleton";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { Box } from "@mui/material";
import { memo } from "react";
import ReactSign from "react-sign";

interface ParcelListProps {
  isLoading: boolean;
  parcels: GetParcelsResponseData[] | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const ParcelList = memo(
  ({ isLoading, parcels, hasNextPage, fetchNextPage }: ParcelListProps) => {
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
  }
);

ParcelList.displayName = "ParcelList";

export default ParcelList;
