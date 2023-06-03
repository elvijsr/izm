import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import testFetch from "../services/testFetch";

export default function Landing() {
  const [address, setAddress] = useState("Tallinas 69");

  const fetch = async () => {
    const response = await testFetch();
    console.log(response);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Box>
        <TextField
          label="Ievadi adresi"
          value={address}
          variant="outlined"
          onChange={({ target }) => setAddress(target.value)}
          fullWidth
        />
      </Box>
    </Container>
  );
}
