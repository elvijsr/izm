import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import ResponsiveDrawer from "../components/responsiveDrawer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/ask-recipe", { replace: true });
  //   }
  // }, []);
  return (
    <Box>
      <ResponsiveDrawer>
        <Outlet />
      </ResponsiveDrawer>
    </Box>
  );
}