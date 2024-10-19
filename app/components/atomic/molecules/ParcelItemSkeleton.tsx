import { Card, CardContent, Divider, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const ParcelItemSkeleton: FunctionComponent = () => {
  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" width="100%" gap={1} textAlign="center">
          {[0, 1].map((index) => (
            <Stack key={index} width="50%" gap={1} alignItems="center">
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={100}
                sx={{ borderRadius: "4px" }}
              />
              <Skeleton variant="text" width="80%" />
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ borderRadius: "4px" }}
        />
      </CardContent>
    </Card>
  );
};

export default ParcelItemSkeleton;
