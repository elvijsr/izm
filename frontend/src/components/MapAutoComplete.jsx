import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const GoogleMapAutocomplete = ({ location, setLocation }) => {
  const [address, setAddress] = React.useState(location);

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = async (value) => {
    setAddress(value);
    setLocation(value);
  };

  const handleClear = () => {
    setAddress("");
    setLocation("");
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            variant="outlined"
            fullWidth
            {...getInputProps({
              placeholder: "Ievadi adresi...",
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="clear address"
                    onClick={handleClear}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div>
            {loading && (
              <Typography sx={{ p: 1 }} variant="body1">
                Loading...
              </Typography>
            )}
            {suggestions.length > 0 && (
              <Paper sx={{ p: 1 }} elevation={1}>
                {suggestions.map((suggestion, i) => (
                  <Typography
                    variant="body1"
                    sx={{ my: "2px" }}
                    key={i}
                    {...getSuggestionItemProps(suggestion)}
                  >
                    {suggestion.description}
                  </Typography>
                ))}
              </Paper>
            )}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GoogleMapAutocomplete;
