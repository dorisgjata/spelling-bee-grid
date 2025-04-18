import { Grid, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import LettersGrid from "./features/LettersGrid";
import { AppProvider } from "./features/state/context";
import TwoLetterWords from "./features/TwoLetterWords";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f7da21",
    },
    secondary: {
      main: "#e6e6e6",
      dark: "#000",
    },
  },
});
function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} maxWidth={1600}>
          <Grid item xs={10} md={5}>
            <LettersGrid />
          </Grid>
          <Grid item xs={10} md={5}>
            <TwoLetterWords />
          </Grid>
        </Grid>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
