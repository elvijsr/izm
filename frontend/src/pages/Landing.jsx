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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
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

  const getUniqueInterestTags = (data) => {
    const tagsSet = new Set(); // Using a Set to ensure unique values

    data.forEach((item) => {
      if (item.interest_tags) {
        item.interest_tags.forEach((tag) => {
          tagsSet.add(tag);
        });
      }
    });

    return Array.from(tagsSet);
  };

  const fetchSchoolsFromAPI = async () => {
    const response = await fetchSchools();
    console.log(response);
    setAllSchools(response.data);
    setInterestTagsList(getUniqueInterestTags(response.data));
  };

  const [filterList, setFilterList] = useState({ idFilter: undefined });
  const masterFilter = () => {
    let list = filteredSchools;

    if (filterList.interestTagsFilter) {
      list = list.filter(
        (school) =>
          school.interest_tags &&
          filterList.interestTagsFilter.every((tag) =>
            school.interest_tags.includes(tag)
          )
      );
    }

    if (filterList.minOCEFilter) {
      list = list.filter((school) => {
        console.log("parsed", parseFloat(school.oce_index_21));
        return (
          parseFloat(school.oce_index_21) * 100 >=
          parseInt(filterList.minOCEFilter)
        );
      });
    }

    setDoubleFilteredSchools(list);
  };

  const [interestTagsSelected, setInterestTagsSelected] = useState([]);
  const [interestTagsList, setInterestTagsList] = useState([]);
  const [minOCE, setMinOCE] = useState(0);

  const handleMinOCEChange = (event) => {
    setMinOCE(event.target.value);
    setFilterList({
      ...filterList,
      minOCEFilter: parseInt(event.target.value),
    });
  };

  const handleInterestTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterestTagsSelected(
      typeof value === "string" ? value.split(",") : value
    );
    console.log("value", value);
    setFilterList({ ...filterList, interestTagsFilter: value });
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
  }, [filterList, filteredSchools]);

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
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            multiple
            value={interestTagsSelected}
            onChange={handleInterestTagChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {interestTagsList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Minimālais OCE"
          value={minOCE}
          onChange={handleMinOCEChange}
        />
      </Box>

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
