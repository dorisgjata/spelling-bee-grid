import { Box, Chip, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { TwoLetterWordsType, Types } from "../types";
import { useAppContext } from "./state/context";
export default function TwoLetterWords() {
  const { state, dispatch } = useAppContext();
  return (
    <Box
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: "lightgrey",
        minWidth: 400,
        maxWidth: 800,
        width: 1,
      }}
    >
      <Typography
        component="h2"
        variant="h1"
        align="center"
        sx={{ fontSize: 32, mt: 2 }}
      >
        Two Letter List
      </Typography>
      <Box sx={{ display: "flex", flexFlow: "column" }}>
        {state.twoLetterWords?.map((item: TwoLetterWordsType) => (
          <Box
            key={item.letter}
            sx={{ display: "flex", justifyContent: "row", p: 1 }}
          >
            <Typography sx={{ m: 2 }}>{item.letter}</Typography>
            <FindWords twoLetters={item.letter} letters={state.letters} />
          </Box>
        ))}
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
  const [first, ...rest] = letters;
  const regexp = new RegExp(`((?=[${rest.join("")}])(?=.${first}.)){4,}`, "gi");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMatch(regexp.test(event.target.value));
    setWord(event.target.value);
  };

  const handleDelete = (deleteWord: string) => () => {
    setWords((words) => words.filter((word) => word !== deleteWord));
    dispatch({ type: Types.Delete, payload: { word: deleteWord } });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      word.startsWith(twoLetters.toLowerCase()) &&
      !words.includes(word) &&
      regexp.test(word)
    ) {
      setWord("");
      setWords((prev) => [...prev, word]);
      dispatch({ type: Types.Add, payload: { word } });
    }
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        value={word}
        onChange={handleChange}
        error={!match && word.length > 0}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {words.map((word, index) => (
          <Box sx={{ p: 1 }} key={`${word}_${index}`}>
            <Chip color="primary" label={word} onDelete={handleDelete(word)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
