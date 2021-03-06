import { Grid, ThemeProvider } from '@mui/material';
import LettersGrid from './features/LettersGrid';
import TwoLetterWords from './features/TwoLetterWords';
import { createTheme } from '@mui/material/styles';
import data from './data/12-27-2021.json';
import { AppProvider } from './features/state/context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f7da21'
    },
    secondary: {
      main: '#e6e6e6',
      dark: '#000'
    }
  }
})
function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} maxWidth={1600}>
          <Grid item xs={10} md={5}>
            <LettersGrid letters={data.letters} rowHeader={data.rowHeader} />
          </Grid>
          <Grid item xs={10} md={5}>
            <TwoLetterWords twoLetterWords={data.twoLetterWords} letters={data.letters} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
