import { Card, CardContent, Divider, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const FlightItemSkeleton: FunctionComponent = () => {
  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" width="100%" gap={1} textAlign="center">
          <Stack width="50%" gap={1} alignItems={"center"}>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="text" width="90%" />
          </Stack>
          <Stack width="50%" gap={1} alignItems={"center"}>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="text" width="90%" />
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={36} />
      </CardContent>
    </Card>
  );
};

export default FlightItemSkeleton;
