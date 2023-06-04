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
import MapAutocomplete from "../components/MapAutoComplete";

export default function Landing() {
  const [address, setAddress] = useState(
    "Hanzas perons, Hanzas iela, Vidzeme Suburb, Riga, Riga"
  );
  const [filteredSchools, setFilteredSchools] = useState([]);
  const fetchSchoolsFromAPI = async () => {
    const response = await fetchSchools();
    console.log(response);
    setFilteredSchools(response.data);
  };

  useEffect(() => {
    fetchSchoolsFromAPI();
  }, []);
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
        <MapAutocomplete location={address} setLocation={setAddress} />
      </Box>
      <Box sx={{ mb: 6 }}>
        {filteredSchools.length > 0 && (
          <Map
            schools={filteredSchools}
            setFilteredSchools={setFilteredSchools}
            origin={address}
          />
        )}
      </Box>
      <Box>
        {filteredSchools.map((item) => (
          <SchoolListItem school={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
}
