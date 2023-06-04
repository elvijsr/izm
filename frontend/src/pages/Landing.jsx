import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  ListItemButton,
  ListItemText,
  Link,
} from "@mui/material";
import SchoolListItem from "../components/SchoolListItem";
import { useEffect, useState } from "react";
import fetchSchools from "../services/fetchSchools";
import Map from "../components/Map";

export default function Landing() {
  const [address, setAddress] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const fetchSchoolsFromAPI = async () => {
    const response = await fetchSchools();
    console.log(response);
    const filtered = response.data.filter((school) =>
      school.address.toLowerCase().includes(address.toLowerCase())
    );
    setFilteredSchools(filtered);
  };

  useEffect(() => {
    fetchSchoolsFromAPI();
  }, [address]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
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
      <Box sx={{ mb: 6 }}>
        <Map />
      </Box>
      <Box>
        {filteredSchools.map((item) => (
          <SchoolListItem school={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
}
