import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Landing from "./pages/Landing.jsx";
import Layout from "./pages/Layout.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/700.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#B15CF4",
    },
    secondary: {
      main: "#FFFFFF",
    },
    tetriary: {
      main: "#4389A2",
    },
    text: {
      body: "#FFFFFF",
    },
  },
  typography: {
    color: "#000000",
    fontFamily: "Outfit",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
