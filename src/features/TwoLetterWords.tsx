import { Box, Chip, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TwoLetterWordsType, Types } from "../types";
import { useAppContext } from "./state/context";

export default function TwoLetterWords() {
  const { state, dispatch } = useAppContext();
  const [input, setInput] = useState<string>("");
  const twoListRegex = /^([a-z]{2})-(\d+)$/i;

  const handleTwoLetterWordsInput = (input: string) => {
    dispatch({ type: Types.SetTwoLetters, payload: { input: input } });
    setInput("");
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTwoLetterWordsInput(input);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: "lightgrey",
        minWidth: 800,
        maxWidth: 1200,
        width: 1,
        height: 1,
        maxHeight: 1000,
        minHeight: 650,
        background: "white",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        align="center"
        sx={{ fontSize: 32, mt: 2, fontWeight: 500 }}
      >
        Two Letter List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h2"
          align="center"
          sx={{ fontSize: 16, mx: 2, color: "#181818", fontWeight: 300 }}
        >
          The two-letter list fields will be generated once the input is
          processed.
        </Typography>

        <TextField
          label="Two letter list"
          sx={{ width: 600, alignSelf: "center", mt: 2 }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleSubmit}
          onBlur={() => handleTwoLetterWordsInput}
          multiline
          fullWidth
          error={!twoListRegex.test(input) && input.length > 0}
        />
        <Grid container spacing={2}>
          {state.twoLetterWords.map((item: TwoLetterWordsType, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Typography sx={{ m: 1 }}>{item.letter}</Typography>
                <FindWords twoLetters={item.letter} letters={state.letters} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function FindWords({
  twoLetters,
  letters,
}: {
  twoLetters: string;
  letters: string[];
}) {
  const [words, setWords] = useState<string[]>([]);
  const { dispatch } = useAppContext();
  const [word, setWord] = useState<string>("");
  const [match, setMatch] = useState<boolean>(true);
  const wordRegex = (twoLetters: string, letters: string[]): RegExp => {
    const pattern = `^${twoLetters}[${letters.join("")}]{2,}$`;
    return new RegExp(pattern, "i");
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMatch(
      !words.find((w) => w === event.target.value) &&
        wordRegex(twoLetters, letters).test(event.target.value)
    );
    setWord(event.target.value);
  };

  const handleDelete = (deleteWord: string) => () => {
    setWords((words) => words.filter((word) => word !== deleteWord));
    dispatch({ type: Types.Delete, payload: { word: deleteWord } });
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(word, wordRegex(twoLetters, letters).test(word));
    if (event.key === "Enter") {
      event.preventDefault();
      if (match) {
        setWord("");
        setWords([...words, word]);
        dispatch({ type: Types.Add, payload: { word } });
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        value={word}
        onChange={handleChange}
        error={!match}
        onKeyDown={handleSubmit}
      />
      <Box
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", mt: 1 }}
      >
        {words.map((word, index) => (
          <Box key={`${word}_${index}`} sx={{ mr: 1, mb: 1 }}>
            <Chip color="primary" label={word} onDelete={handleDelete(word)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
