import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingPosition?: "start" | "end";
}

export default function LoadingButton({
  children,
  loading = false,
  loadingPosition = "start",
  disabled,
  startIcon,
  endIcon,
  ...other
}: LoadingButtonProps) {
  return (
    <Button
      {...other}
      disabled={disabled || loading}
      startIcon={
        loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "white",
              opacity: loadingPosition === "start" ? 1 : 0,
            }}
          />
        )
      }
      endIcon={
        loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "white",
              opacity: loadingPosition === "end" ? 1 : 0,
            }}
          />
        )
      }
      sx={{
        position: "relative",
        ...other.sx,
      }}
    >
      {children}
    </Button>
  );
}
