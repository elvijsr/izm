import { Typography, ListItemButton, ListItemText, Link } from "@mui/material";

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
  return (
    <ListItemButton key={props.school.id} component={Link}>
      <ListItemText>
        <Typography sx={{ fontWeight: "bold" }}>{props.school.name}</Typography>
        <Typography variant="subtitle2" sx={{ color: "#4F4F4F" }}>
          {props.school.sub_type}
        </Typography>
        <Typography variant="subtitle1">
          {cutTextAfterSecondComma(props.school.address)}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}
