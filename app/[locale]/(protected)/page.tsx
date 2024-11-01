"use server";
// import { setStaticParamsLocale } from 'next-international/server';
import FlightList from "@/app/components/flights/FlightList";
import ParcelList from "@/app/components/ParcelList";
import { authOptions } from "@/helpers/authOptions";
import { calculateProfileCompletion } from "@/helpers/calculateProfileCompletion";
import { prisma } from "@/helpers/db";
import { getScopedI18n } from "@/locales/server";
import { FlightTakeoff, LocalShipping } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function Home() {
  const t = await getScopedI18n("home");
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <Typography>{t("not_logged_in")}</Typography>;
  }

  // Fetch the user
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return <Typography>{t("user_not_found")}</Typography>;
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
      User: { select: { id: true, name: true, family: true } },
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
    <Container
      sx={{
        height: "100%",
      }}
    >
      <Stack direction="column" spacing={3} height="100%" width="100%">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            width: "100%",
            position: "relative",
            backgroundImage: "url('/images/parcels-on-luggages.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the color and opacity as needed
              zIndex: 1,
            },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ position: "relative", zIndex: 2 }}
          >
            <Avatar
              alt={user.name ?? ""}
              src={user.photo ?? ""}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h5">
                {user.name} {user.family}
              </Typography>
              <Typography color="textSecondary">
                {user.username} • {user.email}
              </Typography>
              <Typography color="textSecondary">
                {t("profile_completion")}: {profileCompletionPercentage}%
              </Typography>
            </Box>
          </Stack>
          <Box mt={2} sx={{ position: "relative", zIndex: 2 }}>
            <Button variant="contained" component={Link} href="/editProfile">
              {t("edit_profile")}
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{ width: "fit-content", p: 3, mb: 3, alignSelf: "center" }}
        >
          <Stack gap={2}>
            <Stack
              direction="column"
              spacing={2}
              alignSelf="center"
              alignItems="center"
            >
              <Typography variant="h6" gutterBottom>
                {t("do_you_have_a_flight")}
              </Typography>{" "}
              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<FlightTakeoff />}
                  variant="contained"
                  component={Link}
                  href="/addFlight"
                >
                  {t("add_your_flight")}
                </Button>
                <Typography variant="h6" gutterBottom>
                  {t("or")}
                </Typography>
                <Button
                  startIcon={<LocalShipping />}
                  variant="contained"
                  component={Link}
                  href="/parcels"
                >
                  {t("view_parcels")}
                </Button>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              alignSelf="center"
              alignItems="center"
            >
              <Typography variant="h6" gutterBottom>
                {t("do_you_want_to_send_something")}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<LocalShipping />}
                  variant="contained"
                  component={Link}
                  href="/addParcel"
                >
                  {t("add_your_parcel")}
                </Button>
                <Typography variant="h6" gutterBottom>
                  {t("or")}
                </Typography>
                <Button
                  startIcon={<FlightTakeoff />}
                  variant="contained"
                  component={Link}
                  href="/flights"
                >
                  {t("view_flights")}
                </Button>
              </Stack>{" "}
            </Stack>
          </Stack>
        </Paper>

        <Stack mt={4} gap={2}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography variant="h5" gutterBottom>
              {t("recent_flights")}
            </Typography>
            <Button variant="contained" component={Link} href="/addFlight">
              {t("add_new_flight")}
            </Button>
          </Stack>
          {flights.length === 0 ? (
            <Typography>{t("add_your_first_flight")}</Typography>
          ) : (
            <>
              <FlightList flights={flights.slice(0, 10)} isLoading={false} />
              {flights.length > 5 && (
                <Box mt={2}>
                  <Button variant="text" component={Link} href="/flights">
                    {t("view_all_flights")}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Stack>

        <Stack mt={4} gap={2}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography variant="h5" gutterBottom>
              {t("recent_parcels")}
            </Typography>
            <Button variant="contained" component={Link} href="/addParcel">
              {t("add_new_parcel")}
            </Button>
          </Stack>
          {userParcels.length === 0 ? (
            <Typography>{t("add_your_first_parcel")}</Typography>
          ) : (
            <>
              <ParcelList parcels={userParcels.slice(0, 5)} isLoading={false} />
              {userParcels.length > 5 && (
                <Box mt={2}>
                  <Button variant="text" component={Link} href="/parcels">
                    {t("view_all_parcels")}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
