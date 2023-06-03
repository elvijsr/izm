import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import testFetch from "../services/testFetch";

export default function Landing() {
  const fetch = async () => {
    const response = await testFetch();
    console.log(response);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <TextField id="" label="Ievadi adresi" value={""} />
      </Box>
    </Container>
  );
}
