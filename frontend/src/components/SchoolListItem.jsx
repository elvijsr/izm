import {
  Typography,
  Box,
  IconButton,
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import OpenInNew from "@mui/icons-material/OpenInNew";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
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

  return (
    <Accordion
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
        </Box>
      </AccordionSummary>
      <AccordionDetails>
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
