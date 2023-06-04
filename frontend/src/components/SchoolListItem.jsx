import {
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Alert,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import OpenInNew from "@mui/icons-material/OpenInNew";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";

export default function SchoolListItem(props) {
  function cutTextAfterSecondComma(inputText) {
    const commaIndex = inputText.indexOf(",");
    if (commaIndex !== -1) {
      const secondCommaIndex = inputText.indexOf(",", commaIndex + 1);
      if (secondCommaIndex !== -1) {
        return inputText.substring(0, secondCommaIndex);
      }
    }
    return inputText;
  }
  const [accordionExpanded, setAccordionExpanded] = React.useState(false);

  const handleAccordionExpansion = (panel) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? panel : false);
  };

  const [oceExpanded, setOceExpanded] = React.useState(false);
  const handleOceClick = () => {
    setOceExpanded(!oceExpanded);
  };

  const theme = useTheme();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackbarClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Accordion
      sx={{
        borderRadius: 5,
        border: accordionExpanded ? "1px solid lightgrey" : "",
      }}
      elevation={0}
      expanded={accordionExpanded === props.school.id}
      onChange={handleAccordionExpansion(props.school.id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant={accordionExpanded ? "h6" : "body1"}
          >
            {props.school.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ color: "#4F4F4F" }}>
              {props.school.sub_type}
            </Typography>
            <Typography>•</Typography>
            <Typography variant="subtitle2" sx={{ color: "#4F4F4F" }}>
              {props.school.pupil_count} skolēni
            </Typography>
          </Box>
          <Box sx={{ gap: 1, display: accordionExpanded ? "none" : "flex" }}>
            <Chip
              size="small"
              label={`OCE: ${(props.school.oce_index_21 * 100).toFixed(2)}%`}
            />
            <Chip
              size="small"
              sx={{
                backgroundColor:
                  props.school.oce_index_21 - props.school.oce_index_20 > 0
                    ? theme.palette.success.main
                    : theme.palette.alert.main,
              }}
              label={`${(
                (props.school.oce_index_21 - props.school.oce_index_20) *
                100
              ).toFixed(2)}%`}
            />
            <Chip
              icon={<MapIcon />}
              size="small"
              label={`${props.school.distance} km`}
            />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListItem>
            <ListItemText>
              <Typography sx={{ fontWeight: "700" }}>Attālums</Typography>
            </ListItemText>
            <Typography sx={{ fontWeight: "500" }}>
              {props.school.distance + " km"}
            </Typography>
          </ListItem>
          <ListItem onClick={handleOceClick} sx={{ gap: 1 }}>
            {oceExpanded ? <ExpandLess /> : <ExpandMore />}
            <ListItemText>
              <Typography sx={{ fontWeight: "700" }}>OCE indekss:</Typography>
            </ListItemText>
            <Typography>
              {(props.school.oce_index_21 * 100).toFixed(2)}%
            </Typography>
            <Chip
              size="small"
              sx={{
                backgroundColor:
                  props.school.oce_index_21 - props.school.oce_index_20 > 0
                    ? theme.palette.success.main
                    : theme.palette.alert.main,
              }}
              label={`${(
                (props.school.oce_index_21 - props.school.oce_index_20) *
                100
              ).toFixed(2)}%`}
            />
          </ListItem>
          <Collapse in={oceExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ gap: 1 }}>
                <ListItemText>
                  <Typography sx={{ fontWeight: "500" }}>
                    Latviešu valoda:
                  </Typography>
                </ListItemText>
                <Typography>
                  {(props.school.oce_latv_21 * 100).toFixed(2)}%
                </Typography>
                <Chip
                  size="small"
                  sx={{
                    backgroundColor:
                      props.school.oce_latv_21 - props.school.oce_latv_20 > 0
                        ? theme.palette.success.main
                        : theme.palette.alert.main,
                  }}
                  label={`${(
                    (props.school.oce_latv_21 - props.school.oce_latv_20) *
                    100
                  ).toFixed(2)}%`}
                />
              </ListItem>
              <ListItem sx={{ gap: 1 }}>
                <ListItemText>
                  <Typography sx={{ fontWeight: "500" }}>
                    Matemātika:
                  </Typography>
                </ListItemText>
                <Typography>
                  {(props.school.oce_math_21 * 100).toFixed(2)}%
                </Typography>
                <Chip
                  size="small"
                  sx={{
                    backgroundColor:
                      props.school.oce_math_21 - props.school.oce_math_20 > 0
                        ? theme.palette.success.main
                        : theme.palette.alert.main,
                  }}
                  label={`${(
                    (props.school.oce_math_21 - props.school.oce_math_20) *
                    100
                  ).toFixed(2)}%`}
                />
              </ListItem>
              <ListItem sx={{ gap: 1 }}>
                <ListItemText>
                  <Typography sx={{ fontWeight: "500" }}>
                    Svešvaloda:
                  </Typography>
                </ListItemText>
                <Typography>
                  {(props.school.oce_sves_21 * 100).toFixed(2)}%
                </Typography>
                <Chip
                  size="small"
                  sx={{
                    backgroundColor:
                      props.school.oce_sves_21 - props.school.oce_sves_20 > 0
                        ? theme.palette.success.main
                        : theme.palette.alert.main,
                  }}
                  label={`${(
                    (props.school.oce_sves_21 - props.school.oce_sves_20) *
                    100
                  ).toFixed(2)}%`}
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List dense disablePadding>
          {props.school.web && (
            <ListItem
              component={Link}
              href={props.school.web}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemButton>
                <ListItemIcon>
                  <OpenInNew />
                </ListItemIcon>
                <ListItemText primary={props.school.web} />
              </ListItemButton>
            </ListItem>
          )}
          {props.school.email && (
            <ListItem onClick={handleSnackbarClick}>
              <ListItemButton onClick={handleCopy(props.school.email)}>
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText primary={props.school.email} />
                <ContentCopyIcon />
              </ListItemButton>
            </ListItem>
          )}
          {props.school.phone && (
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LocalPhoneIcon />
                </ListItemIcon>
                <ListItemText primary={props.school.phone} />
              </ListItemButton>
            </ListItem>
          )}
          {props.school.address && (
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="subtitle2" sx={{ fontWeight: "400" }}>
                    {accordionExpanded
                      ? props.school.address
                      : cutTextAfterSecondComma(props.school.address)}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          action={action}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            Kopēts starpliktuvē
          </Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}
