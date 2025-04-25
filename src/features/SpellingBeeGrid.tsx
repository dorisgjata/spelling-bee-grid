import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Types } from "../types";
import { useAppContext } from "./state/context";
import TextComponent from "./TextComponent";

export default function SpellingBeeGrid() {
  const { state, dispatch } = useAppContext();
  const [todaysLetters, setTodaysLetters] = useState("");
  const [gridInput, setGridInput] = useState<string>("");

  const handleLetters = (input: string) => {
    const trimmed = input.replace(/\s+/g, "");
    setTodaysLetters(trimmed);
  };

  const handleLettersSubmit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && todaysLetters.length === 7) {
      event.preventDefault();
      dispatch({
        type: Types.SetLetters,
        payload: { letters: todaysLetters.split("") },
      });
    }
    setTodaysLetters("");
  };

  const handleGridInput = (input: string) => {
    dispatch({
      type: Types.SetGrid,
      payload: { input: input },
    });
    setGridInput("");
  };

  const handleGridSubmit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGridInput(gridInput);
    }
  };
  console.log(todaysLetters, todaysLetters.length);

  return (
    <TableContainer
      component={Box}
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: "lightgrey",
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        background: "white",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        align="center"
        sx={{ fontSize: 32, mt: 2, fontWeight: 500 }}
      >
        Spelling Bee Grid
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "center" }}
      >
        <TextComponent
          title="Letters"
          subtitle="Input center letter first."
          input={todaysLetters}
          onChange={(event) => handleLetters(event.target.value)}
          onBlur={() => handleLetters}
          onKeyDown={handleLettersSubmit}
          // inputProps={{ maxLength: 7 }}
        />
        <TextComponent
          title="Grid"
          subtitle="Grid will be auto-filled once input is processed."
          input={gridInput}
          onChange={(event) => setGridInput(event.target.value)}
          onKeyDown={handleGridSubmit}
          onBlur={() => handleGridInput}
        />
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {state.letters.map((letter: string, index: number) => (
          <Typography
            key={letter}
            sx={{ m: 2, fontWeight: index === 0 ? 600 : 400 }}
          >
            {letter}
          </Typography>
        ))}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {/** empty first cell */}
            {state.rowHeader.map((header) => (
              <TableCell key={header} sx={{ fontWeight: 600 }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.rows.map((row, rowIndex) => (
            <TableRow
              key={`${row.letter || "empty"}_${rowIndex}`}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                  fontWeight: 600,
                },
              }}
            >
              <TableCell
                key={`header_${rowIndex}`}
                component="th"
                scope="row"
                sx={{ fontWeight: 600 }}
              >
                {row.letter}
              </TableCell>
              {row.repeats.map((num, index) => (
                <TableCell key={`cell_${rowIndex}_${index}`}>
                  {num === 0 ? "-" : num}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
