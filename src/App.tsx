import { Grid, ThemeProvider } from '@mui/material';
import LettersGrid from './features/LettersGrid';
import TwoLetterWords from './features/TwoLetterWords';
import { createTheme } from '@mui/material/styles';
import data from './data/12-27-2021.json';
import { useReducer } from 'react';
import { reducer } from './features/state/State';


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
  const initialState = { words: [], repeats: data.rows };
  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} maxWidth={1600}>
        <Grid item xs={10} md={5}>
          <LettersGrid rows={data.rows} letters={data.letters} rowHeader={data.rowHeader} />
        </Grid>
        <Grid item xs={10} md={5}>
          <TwoLetterWords twoLetterWords={data.twoLetterWords} letters={data.letters} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
