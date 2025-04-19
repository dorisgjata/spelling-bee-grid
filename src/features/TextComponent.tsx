import {
  Box,
  InputBaseComponentProps,
  TextField,
  Typography,
} from "@mui/material";

export default function TextComponent(props: {
  input: string;
  subtitle: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  inputProps?: InputBaseComponentProps;
}) {
  const { input, title, subtitle, inputProps, onChange, onBlur } = props;
  console.log(input);
  return (
    <Box
      component={Box}
      sx={{
        minWidth: 200,
        maxWidth: 400,
        p: 2,
        alignSelf: "center",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        align="center"
        sx={{ fontSize: 28 }}
      >
        {title}
      </Typography>
      <Typography component="h2" align="center" sx={{ fontSize: 16, mx: 2 }}>
        {subtitle}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label={title}
          value={input}
          onChange={onChange}
          onBlur={onBlur}
          sx={{ mt: 1.5 }}
          multiline
          fullWidth
          inputProps={inputProps}
        ></TextField>
      </Box>
    </Box>
  );
}
