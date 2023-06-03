import { useRouteError } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h5" align="center">
        Šī lapa neeksistē!
      </Typography>
    </Container>
  );
}