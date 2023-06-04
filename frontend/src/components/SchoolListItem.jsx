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

  return (
    <Accordion
      elevation={0}
      expanded={expanded === props.school.id}
      onChange={handleAccordionExpansion(props.school.id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant={expanded ? "h6" : "body1"}
          >
            {props.school.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#4F4F4F" }}>
            {props.school.sub_type}
          </Typography>
          <Typography variant="subtitle1">
            {expanded
              ? props.school.address
              : cutTextAfterSecondComma(props.school.address)}
          </Typography>
          <Box>
            <Chip
              label={`OCE: ${(props.school.oce_index_21 * 100).toFixed(2)}%`}
            />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>Interešu izglītība</Typography>
          <Typography>{props.school.interests}</Typography>
        </Box>
        <List>
          <ListItem onClick={handleClick}>
            <ListItemText>
              <Typography sx={{ fontWeight: "700" }}>OCE indekss:</Typography>
            </ListItemText>
            <Typography>
              {(props.school.oce_index_21 * 100).toFixed(2)}%
            </Typography>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText>
                  <Typography sx={{ fontWeight: "500" }}>
                    OCE Latviešu valoda:
                  </Typography>
                </ListItemText>
                <Typography>
                  {(props.school.oce_latv_21 * 100).toFixed(2)}%
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography sx={{ fontWeight: "500" }}>
                    OCE Matemātika:
                  </Typography>
                </ListItemText>
                <Typography>
                  {(props.school.oce_math_21 * 100).toFixed(2)}%
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography sx={{ fontWeight: "500" }}>
                    OCE Svešvaloda:
                  </Typography>
                </ListItemText>
                <Typography>
                  {(props.school.oce_sves_21 * 100).toFixed(2)}%
                </Typography>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List dense>
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
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
