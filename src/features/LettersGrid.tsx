import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Types } from "../types";
import { useAppContext } from "./state/context";
import TodaysLetters from "./TodaysLetters";

export default function LettersGrid() {
  const { state, dispatch } = useAppContext();
  const [todaysLetters, setTodaysLetters] = useState("");

  useEffect(() => {
    if (todaysLetters.length === 7) {
      dispatch({
        type: Types.SetLetters,
        payload: { letters: todaysLetters.split("") },
      });
    }
  }, [todaysLetters]);
  return (
    <TableContainer
      component={Box}
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: "lightgrey",
        minWidth: 400,
        maxWidth: 800,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h1"
        align="center"
        sx={{ fontSize: 32, mt: 2 }}
      >
        Spelling Bee Grid
      </Typography>
      <TodaysLetters
        letters={todaysLetters}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodaysLetters(e.target.value)
        }
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {todaysLetters.split("").map((letter: string, index: number) => (
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
