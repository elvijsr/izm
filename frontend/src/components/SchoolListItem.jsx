import {
  Typography,
  Box,
  Chip,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

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
              icon={<ShowChartIcon />}
              sx={{
                backgroundColor:
                  props.school.oce_index_21 - props.school.oce_index_20 > 0
                    ? theme.palette.success.main
                    : theme.palette.alert.main,
              }}
              label={
                props.school.oce_index_21 - props.school.oce_index_20 > 0
                  ? `+${(
                      (props.school.oce_index_21 - props.school.oce_index_20) *
                      100
                    ).toFixed(2)}%`
                  : `${(
                      (props.school.oce_index_21 - props.school.oce_index_20) *
                      100
                    ).toFixed(2)}%`
              }
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
          <ListItem sx={{ gap: 1 }}>
            <ListItemText>
              <Typography sx={{ fontWeight: "700" }}>Attālums</Typography>
            </ListItemText>
            <Typography sx={{ fontWeight: "500" }}>
              {props.school.distance + " km"}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                fontWeight: "500",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Chip
                size="small"
                icon={<DirectionsCarIcon />}
                label={props.school.duration}
              />
              <Chip
                size="small"
                icon={<DirectionsWalkIcon />}
                label={
                  props.school.walking_duration
                    ? props.school.walking_duration
                    : "hz"
                }
              />
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
              icon={<ShowChartIcon />}
              sx={{
                backgroundColor:
                  props.school.oce_index_21 - props.school.oce_index_20 > 0
                    ? theme.palette.success.main
                    : theme.palette.alert.main,
              }}
              label={
                props.school.oce_index_21 - props.school.oce_index_20 > 0
                  ? `+${(
                      (props.school.oce_index_21 - props.school.oce_index_20) *
                      100
                    ).toFixed(2)}%`
                  : `${(
                      (props.school.oce_index_21 - props.school.oce_index_20) *
                      100
                    ).toFixed(2)}%`
              }
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
              <ListItemIcon>
                <OpenInNew />
              </ListItemIcon>
              <ListItemText primary={props.school.web} />
            </ListItem>
          )}
          {props.school.email && (
            <ListItem>
              <ListItemIcon>
                <AlternateEmailIcon />
              </ListItemIcon>
              <ListItemText primary={props.school.email} />
            </ListItem>
          )}
          {props.school.phone && (
            <ListItem>
              <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={props.school.phone} />
            </ListItem>
          )}
          {props.school.address && (
            <ListItem>
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
            </ListItem>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
