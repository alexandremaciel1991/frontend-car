import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontWeight: 700,
      fontSize: "2.6rem",
    },
    h2: {
      fontFamily: "Oxygen, sans-serif",
      fontWeight: 700,
      fontSize: "2.4rem",
    },
    h3: {
      fontFamily: "Oxygen, sans-serif",
      fontWeight: 700,
      fontSize: "2.0rem",
    },
    h4: {
      fontFamily: "Oxygen, sans-serif",
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h5: {
      fontFamily: "Oxygen, sans-serif",
      fontSize: "1.17rem",
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  },
});

export default theme;
