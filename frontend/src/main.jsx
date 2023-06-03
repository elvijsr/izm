import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Landing from './pages/Landing.jsx'
import Layout from './pages/Layout.jsx'
import ErrorPage from './pages/errorPage.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#5C258D",
    },
    tetriary: {
      main: "#4389A2",
    },
    text: {
      body: "#FFFFFF"
    }
  },
  typography: {
    color: "#000000"
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
      element: <Landing />
    }
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
