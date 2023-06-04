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
import testFetch from "../services/testFetch";
import schoolList from "../assets/skolas.json";
import Map from "../components/Map";

export default function Landing() {
  const [address, setAddress] = useState("");
  const [filteredSchools, setFilteredSchools] = useState(schoolList);
  const fetch = async () => {
    const response = await testFetch();
    console.log(response);
  };

  useEffect(() => {
    const filtered = schoolList.filter((school) =>
      school.address.toLowerCase().includes(address.toLowerCase())
    );
    setFilteredSchools(filtered);

    fetch();
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
