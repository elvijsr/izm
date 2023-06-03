import { Box, Container, Typography, Grid, Button, TextField } from "@mui/material";

export default function Landing() {
  return (
    <Container sx={{display: 'flex', flexDirection: "column"}}>
      <Box>
        <TextField
          id=""
          label="Ievadi adresi"
          value={""}
        />
      </Box>
    </Container>
  );
}