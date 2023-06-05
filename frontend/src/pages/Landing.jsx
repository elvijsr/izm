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
  Slider,
  Switch,
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
  const [doubleFilteredSchools, setDoubleFilteredSchools] = useState(null);
  const [radiusFilter, setRadiusFilter] = useState(2);

  const fetchSchoolsFromAPI = async () => {
    const response = await fetchSchools();
    console.log(response);
    setAllSchools(response.data);
  };

  const [filterList, setFilterList] = useState({ idFilter: undefined });
  const masterFilter = () => {
    let list = filteredSchools;

    if (filterList.idFilter) {
      list = list.filter((school) => school.id === filterList.idFilter);
    }

    setDoubleFilteredSchools(list);
  };

  const [checked, setChecked] = useState(false);
  const handleIdChange = (event) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      setFilterList({ ...filterList, idFilter: 1 });
    } else {
      setFilterList({ ...filterList, idFilter: undefined });
    }
  };

  const handleRadiusFilter = (event, newValue) => {
    setRadiusFilter(newValue);
  };

  const marks = [
    {
      value: 1,
      label: "1 km",
    },
    {
      value: 10,
      label: "10 km",
    },
  ];

  useEffect(() => {
    masterFilter();
  }, [filterList]);

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
            schoolRadius={radiusFilter}
            doubleFilteredSchools={doubleFilteredSchools}
            setDoubleFilteredSchools={setDoubleFilteredSchools}
          />
        )}
      </Box>
      {filteredSchools && filteredSchools.length === 0 && (
        <Typography>Šajā apkaimē skolas vēl netika pievienotas.</Typography>
      )}
      <Switch
        checked={checked}
        onChange={handleIdChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Box sx={{ px: 2 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography>Attālums:</Typography>
          <Typography sx={{ fontWeight: 500 }}>{radiusFilter} km</Typography>
        </Box>
        <Slider
          aria-label="Custom marks"
          value={radiusFilter}
          valueLabelDisplay="auto"
          onChange={handleRadiusFilter}
          marks
          step={1}
          min={1}
          max={10}
        />
      </Box>
      {doubleFilteredSchools && (
        <Box sx={{ mb: 2 }}>
          {doubleFilteredSchools.map((item) => (
            <SchoolListItem school={item} key={item.id} />
          ))}
        </Box>
      )}
    </Box>
  );
}
