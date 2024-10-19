import { GetFlightsResponseData } from "@/types/apis/flights";
import { PaginatedResponse } from "@/types/apis/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseGetInfiniteFlightsProps {
  filters: {
    departureCountryId?: string;
    destinationCountryId?: string;
  };
}

const useGetInfiniteFlights = ({ filters }: UseGetInfiniteFlightsProps) => {
  return useInfiniteQuery<PaginatedResponse<GetFlightsResponseData>>({
    queryKey: ["flights", filters],
    queryFn: ({ pageParam }) =>
      axios
        .get("/api/v1/flights", {
          params: {
            page: pageParam,
            ...filters,
          },
        })
        .then((x) => x.data),
    getNextPageParam: (lastPage) =>
      lastPage.page >= lastPage.totalPages
        ? lastPage.page + 1
        : null,
    initialPageParam: 1,
  });
};

export default useGetInfiniteFlights;
