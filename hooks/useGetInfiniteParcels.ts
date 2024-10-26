import { PaginatedResponse } from "@/types/apis/general";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// Update the IFilters interface to include the filter fields
interface IFilters {
  country?: string;
  startDate?: string;
  endDate?: string;
  parcelType?: string;
}

const useGetInfiniteParcels = (props: { filters?: IFilters } | undefined) => {
  return useInfiniteQuery<PaginatedResponse<GetParcelsResponseData>>({
    queryKey: ["parcels", props?.filters], // Include filters in the query key
    queryFn: ({ pageParam }) =>
      axios
        .get("/api/v1/parcels", {
          params: {
            page: pageParam,
            ...props?.filters, // Spread the filters into the params
          },
        })
        .then((x) => x.data),
    getNextPageParam: (lastPage) =>
      lastPage.page >= lastPage.totalPages ? lastPage.page + 1 : null,
    initialPageParam: 1,
  });
};

export default useGetInfiniteParcels;
