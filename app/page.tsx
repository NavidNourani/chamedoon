import { Button, Container } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Link href="/addCargo">
        <Button variant="contained" color="primary">
          Add new CARGO
        </Button>
      </Link>
    </Container>
  );
}
