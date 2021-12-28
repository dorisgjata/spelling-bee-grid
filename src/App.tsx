import { Grid } from '@mui/material';
import LettersGrid from './features/LettersGrid';
import TwoLetterWords from './features/TwoLetterWords';
function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} md={5}>
        <LettersGrid />
      </Grid>
      <Grid item xs={10} md={5}>
        <TwoLetterWords />
      </Grid>
    </Grid>
  );
}

export default App;
