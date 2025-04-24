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
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  inputProps?: InputBaseComponentProps;
}) {
  const { input, title, subtitle, inputProps, onChange, onBlur, onKeyDown } =
    props;
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
        sx={{ fontSize: 28, fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Typography
        component="h2"
        align="center"
        sx={{ fontSize: 16, mx: 2, color: "#242424", fontWeight: 300 }}
      >
        {subtitle}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label={title}
          value={input}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          sx={{
            mt: 1.5,
            "& label.Mui-focused": {
              color: "primary.dark",
            },
          }}
          multiline
          fullWidth
          inputProps={inputProps}
        />
      </Box>
    </Box>
  );
}
