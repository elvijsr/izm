import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    fontFamily: "Lexend",
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
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
