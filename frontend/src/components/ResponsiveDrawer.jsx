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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText"
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../assets/Logo.svg"
import Avatar from "@mui/material/Avatar"

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
        name: "Meklēt"
    },
    {
        name: "Tops",
    },
    { 
        name: "Karte",
    }
  ];

  const drawerWidth = 240;

  const location = useLocation();

  const isSelected = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ gap: 1, alignItems: "center" }}>
        <Link to="/" sx={{display: "flex", flexDirection: "row", textDecoration: "none", color: "black" }}>
          <Typography
            variant="h5"
            noWrap
          >
            SkoluRadars
          </Typography>
        </Link>
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
            <ListItemText>
                {item.name}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          display: { sm: "none" },
        }}
      >
        <Toolbar sx={{alignItems: "center"}}>
            <IconButton aria-label="" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none"}}>
            <Typography
              variant="h5"
              component="div"
              color="#000000"
            >
              SkoluRadars
            </Typography>
          </Link>
          <Avatar color="#FFFFFF" sx={{backgroundColor: "#FFFFFF", padding: 3}}>
          <img src={Logo} className="logo" width="99"/>
          </Avatar>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 1 },
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;