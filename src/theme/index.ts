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
      fontWeight: 700,
      fontSize: "2.4rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "2.2rem",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export default theme;
