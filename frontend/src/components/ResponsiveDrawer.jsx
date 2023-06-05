import AppBar from "@mui/material/AppBar";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../assets/Logo3.svg";
import LogoWhite from "../assets/Logo-white.svg";
import Avatar from "@mui/material/Avatar";

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    if (matches) {
      setMobileOpen(!mobileOpen);
    }
  };

  const pages = [
    {
      name: "Meklēt",
    },
    {
      name: "Tops",
    },
    {
      name: "Karte",
    },
  ];

  const drawerWidth = 240;

  const location = useLocation();

  const isSelected = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ gap: 1, alignItems: "center" }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
            alignItems: "center",
            color: "#B15CF4",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }} noWrap>
            SkoluRadars
          </Typography>
          <Avatar sx={{ backgroundColor: "#FFFFFF", margin: 1 }}>
            <img src={LogoWhite} className="logo" width="35" />
          </Avatar>
        </Box>
      </Toolbar>
      <List>
        {pages.map((item, index) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={isSelected(item.path)}
            onClick={handleDrawerToggle}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#f4e7ff",
              },
            }}
          >
            <ListItemText>{item.name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ alignItems: "center", justifyContent: "center" }}>
          {/* <IconButton
            color="secondary"
            aria-label=""
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton> */}
          <Avatar sx={{ backgroundColor: "#FFFFFF", margin: 1 }}>
            <img src={Logo} className="logo" width="35" />
          </Avatar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
              component="div"
              color="#B15CF4"
            >
              SkoluRadars
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
