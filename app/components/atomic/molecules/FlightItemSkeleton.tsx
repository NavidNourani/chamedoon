import { Card, CardContent, Divider, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const FlightItemSkeleton: FunctionComponent = () => {
  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" width="100%" gap={1} textAlign="center">
          <Stack width="50%" gap={1} alignItems="center">
            {/* Title Skeleton */}
            <Skeleton width={100} height={24} />

            {/* Flag Image Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ aspectRatio: "256/136", borderRadius: "4px" }}
            />

            {/* Location Text Skeleton */}
            <Skeleton width={150} height={24} />
          </Stack>

          <Stack width="50%" gap={1} alignItems="center">
            {/* Title Skeleton */}
            <Skeleton width={100} height={24} />

            {/* Flag Image Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ aspectRatio: "256/136", borderRadius: "4px" }}
            />

            {/* Location Text Skeleton */}
            <Skeleton width={150} height={24} />
          </Stack>
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* Details Button Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={36}
          sx={{ borderRadius: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default FlightItemSkeleton;
