import { Person } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";

interface ImageUploaderProps {
  photoUrl: string;
  uploadProgress: number | null;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploadButtonText: string;
  uploadingText: string;
  size?: number;
}

const ImageUploader = ({
  photoUrl,
  uploadProgress,
  onUpload,
  uploadButtonText,
  uploadingText,
  size = 60,
}: ImageUploaderProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          outline: "2px solid white",
          width: "fit-content",
          outlineOffset: "4px",
          borderRadius: "50%",
          alignSelf: "center",
          "&>img": {
            borderRadius: "50%",
            objectFit: "cover",
            width: `${size}px`,
            height: `${size}px`,
          },
        }}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt="User Photo"
            width={size}
            height={size}
            quality={100}
          />
        ) : (
          <Person sx={{ width: size, height: size }} />
        )}
      </Box>

      {uploadProgress !== null && (
        <Box sx={{ width: "100%", mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#8b5cf6",
              },
            }}
          />
          <Typography
            variant="caption"
            color="white"
            align="center"
            display="block"
            sx={{ mt: 1 }}
          >
            {uploadProgress}%
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        component="label"
        fullWidth
        disabled={uploadProgress !== null}
        sx={{ mb: 4 }}
      >
        {uploadProgress !== null ? uploadingText : uploadButtonText}
        <input type="file" hidden accept="image/*" onChange={onUpload} />
      </Button>
    </>
  );
};

export default ImageUploader;
