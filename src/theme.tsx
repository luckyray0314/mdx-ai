import { createTheme } from "@mui/material/styles";
// import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          /* Your custom body styles here */
          // fontFamily: "Roboto, sans-serif",
          // fontSize: "16px",
          background: "linear-gradient(45deg, #101921 30%, #1C3F2F 90%)",
          // Add other styles as needed
        },
      },
    },
  },
});

export default theme;
