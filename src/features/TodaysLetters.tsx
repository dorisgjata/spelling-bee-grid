import { Box, TextField, Typography } from "@mui/material";

export default function TodaysLetters(props: {
  letters: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { letters, onChange } = props;
  return (
    <Box
      component={Box}
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: "lightgrey",
        minWidth: 200,
        maxWidth: 400,
        p: 2,
        mt: 2,
        alignSelf: "center",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        align="center"
        sx={{ fontSize: 24 }}
      >
        Today's Letters
      </Typography>
      <Typography component="h2" align="center" sx={{ fontSize: 16, mx: 2 }}>
        Input center letter first
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Letters"
          value={letters}
          onChange={onChange}
          sx={{ mt: 1.5 }}
          inputProps={{ maxLength: 7 }}
        ></TextField>
      </Box>
    </Box>
  );
}
