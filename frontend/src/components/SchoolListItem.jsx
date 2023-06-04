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

  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const theme = useTheme();

  return (
    <Accordion
      elevation={0}
      expanded={expanded === props.school.id}
      onChange={handleAccordionExpansion(props.school.id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant={expanded ? "h6" : "body1"}
          >
            {props.school.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#4F4F4F" }}>
            {props.school.sub_type}
          </Typography>
          <Box sx={{ gap: 1, display: expanded ? "none" : "flex" }}>
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
              size="small"
              icon={<GroupIcon />}
              label={props.school.pupil_count}
            />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography>Cilvēku skaits:</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            {props.school.pupil_count}
          </Typography>
        </Box>
        <List>
          <ListItem onClick={handleClick} sx={{ gap: 1 }}>
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
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText primary={props.school.email} />
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
                    {expanded
                      ? props.school.address
                      : cutTextAfterSecondComma(props.school.address)}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
