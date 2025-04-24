import { Link, Stack, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import SpellingBeeGrid from "./features/SpellingBeeGrid";
import { AppProvider } from "./features/state/context";
import TwoLetterWords from "./features/TwoLetterWords";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f7da21",
      dark: "#c5ae1a",
    },
    secondary: {
      main: "#e6e6e6",
      dark: "#000",
    },
  },
});
function App() {
  const today = new Date();
  const formattedDate = `/${today.getUTCFullYear()}/${String(
    today.getUTCMonth() + 1
  ).padStart(2, "0")}/${String(today.getUTCDate()).padStart(2, "0")}/`;

  const link = `https://www.nytimes.com/${formattedDate}/crosswords/spelling-bee-forum.html`;
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            margin: "0 auto",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "flex-start",
            background: "#f2f2f2",
            borderRadius: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            align="center"
            sx={{ fontSize: 32, mt: 2, fontWeight: 600 }}
          >
            Spelling Bee Helper
          </Typography>
          <>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              sx={{ fontSize: 18, mt: 2 }}
            >
              Find today's Spelling Bee info on the{" "}
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary.dark" }}
              >
                forum
              </Link>
            </Typography>
          </>
          <Stack
            spacing={1}
            direction={{ sm: "column", md: "row" }}
            sx={{
              padding: 1,
              margin: "0 auto",
            }}
          >
            <SpellingBeeGrid />
            <TwoLetterWords />
          </Stack>
        </Stack>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
