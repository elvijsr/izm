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
  const [allSchools, setAllSchools] = useState(null);
  const [filteredSchools, setFilteredSchools] = useState(null);
  const fetchSchoolsFromAPI = async () => {
    const response = await fetchSchools();
    console.log(response);
    setAllSchools(response.data);
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
      <Box sx={{ mb: 3 }}>
        {allSchools && (
          <Map
            schools={allSchools}
            setFilteredSchools={setFilteredSchools}
            origin={address}
            schoolRadius={2}
          />
        )}
      </Box>
      {filteredSchools && filteredSchools.length === 0 && (<Typography>Šajā apkaimē skolas vēl netika pievienotas.</Typography>)}
      {filteredSchools && (
        <Box sx={{ mb: 2 }}>
          {filteredSchools.map((item) => (
            <SchoolListItem school={item} key={item.id} />
          ))}
        </Box>
      )}
    </Box>
  );
}
