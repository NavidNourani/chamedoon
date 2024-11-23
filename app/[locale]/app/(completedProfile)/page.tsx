"use server";
// import { setStaticParamsLocale } from 'next-international/server';
import FlightList from "@/app/components/flights/FlightList";
import ParcelList from "@/app/components/ParcelList";
import { authOptions } from "@/helpers/authOptions";
import { calculateProfileCompletion } from "@/helpers/calculateProfileCompletion";
import { prisma } from "@/helpers/db";
import { getScopedI18n } from "@/locales/server";
import { Add, FlightTakeoff } from "@mui/icons-material";
import RedeemIcon from "@mui/icons-material/Redeem";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fade,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const t = await getScopedI18n("home");
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch the user
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  // Calculate profile completion percentage
  const profileCompletionPercentage = calculateProfileCompletion(user);

  // If user is found, fetch flights and parcels separately
  const flights = await prisma.flight.findMany({
    where: { userID: user.id },
    include: {
      user: true,
      departureAirport: {
        include: {
          city: {
            include: {
              country: {
                select: {
                  id: true,
                  name: true,
                  iso2: true,
                },
              },
            },
          },
        },
      },
      destinationCity: { include: { translations: true } },
      destinationAirport: {
        include: {
          city: {
            include: {
              country: {
                select: {
                  id: true,
                  name: true,
                  iso2: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const userParcels = await prisma.parcel.findMany({
    where: { userID: user.id },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          family: true,
          phone: true,
          countryCode: true,
        },
      },
      destinationCity: { include: { translations: true } },
      departureAirport: {
        include: {
          city: {
            include: {
              country: true,
            },
          },
        },
      },
      destinationAirport: {
        include: {
          city: {
            include: {
              country: true,
            },
          },
        },
      },
    },
  });

  user.password = "";

  return (
    <Container sx={{ height: "100%", pb: 3 }}>
      <Stack direction="column" spacing={3} height="100%" width="100%">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            width: "100%",
            height: "auto",
            minHeight: "200px",
            position: "relative",
            backgroundSize: "cover",
            backgroundImage: "url('/images/parcels-on-luggages.jpeg')",
            backgroundPosition: "center",
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))",
              zIndex: 1,
            },
          }}
        >
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ position: "relative", zIndex: 2 }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                position: "relative",
                border: "2px solid white",
              }}
            >
              {user.photo ? (
                <Image
                  alt={user.name ?? ""}
                  src={user.photo}
                  fill
                  sizes="90px"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                user.name?.[0] ?? ""
              )}
            </Avatar>
            <Box dir="rtl">
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {user.name} {user.family}
              </Typography>
              <Typography
                sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem" }}
              >
                {user.username} • {user.email}
              </Typography>
              <Typography
                sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem" }}
              >
                {`${t("profile_completion")}: ${profileCompletionPercentage} %`}
              </Typography>
            </Box>
          </Stack>
          <Box mt={3} sx={{ position: "relative", zIndex: 2 }}>
            <Button
              variant="contained"
              component={Link}
              href="/app/editProfile"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  transition: "background-color 0.3s ease",
                },
                borderRadius: 1,
                px: 3,
                py: 1,
              }}
            >
              {t("edit_profile")}
            </Button>
          </Box>
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} gap={3}>
          <Box sx={{ flex: "1 1 45%" }}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/passenger_in_airport.png"
                alt="Flight"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t("do_you_have_a_flight")}
                </Typography>
                <ButtonGroup variant="contained" fullWidth>
                  <Button
                    startIcon={<FlightTakeoff />}
                    component={Link}
                    href="/app/addFlight"
                  >
                    {t("add_your_flight")}
                  </Button>
                  <Button
                    startIcon={<RedeemIcon />}
                    component={Link}
                    href="/app/parcels"
                  >
                    {t("view_parcels")}
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/ready_parcel.png"
                alt="Parcel"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t("do_you_want_to_send_something")}
                </Typography>
                <ButtonGroup variant="contained" fullWidth>
                  <Button
                    startIcon={<RedeemIcon />}
                    component={Link}
                    href="/app/addParcel"
                  >
                    {t("add_your_parcel")}
                  </Button>
                  <Button
                    startIcon={<FlightTakeoff />}
                    component={Link}
                    href="/app/flights"
                  >
                    {t("view_flights")}
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        <Stack mt={4} gap={4} sx={{ px: 2 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {t("recent_flights")}
            </Typography>
            <IconButton
              color="primary"
              component={Link}
              href="/app/addFlight"
              sx={{
                bgcolor: "secondary.light",
                "&:hover": {
                  bgcolor: "secondary.main",
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
            >
              <Add />
            </IconButton>
          </Stack>
          {flights.length === 0 ? (
            <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
              {t("add_your_first_flight")}
            </Typography>
          ) : (
            <Fade in={true} timeout={500}>
              <div>
                <FlightList flights={flights.slice(0, 10)} isLoading={false} />
                {flights.length > 5 && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      component={Link}
                      href="/app/flights"
                      sx={{
                        color: "primary.main",
                        borderColor: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.light",
                        },
                      }}
                    >
                      {t("view_all_flights")}
                    </Button>
                  </Box>
                )}
              </div>
            </Fade>
          )}
        </Stack>

        <Stack mt={4} gap={4} sx={{ px: 2 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {t("recent_parcels")}
            </Typography>
            <IconButton
              color="primary"
              component={Link}
              href="/app/addParcel"
              sx={{
                bgcolor: "secondary.light",
                "&:hover": {
                  bgcolor: "secondary.main",
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
            >
              <Add />
            </IconButton>
          </Stack>
          {userParcels.length === 0 ? (
            <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
              {t("add_your_first_parcel")}
            </Typography>
          ) : (
            <Fade in={true} timeout={500}>
              <div>
                <ParcelList
                  parcels={userParcels.slice(0, 5)}
                  isLoading={false}
                />
                {userParcels.length > 5 && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      component={Link}
                      href="/app/parcels"
                      sx={{
                        color: "primary.main",
                        borderColor: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.light",
                        },
                      }}
                    >
                      {t("view_all_parcels")}
                    </Button>
                  </Box>
                )}
              </div>
            </Fade>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
