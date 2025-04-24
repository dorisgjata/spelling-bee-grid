import { AppState, Rows, TwoLetterWordsType, Types } from "../../types";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export type WordsPayload = {
  [Types.Add]: { word: string };
  [Types.Delete]: { word: string };
  [Types.SetLetters]: { letters: string[] };
  [Types.SetTwoLetters]: { input: string };
  [Types.SetGrid]: { input: string };
};

export type WordsAction =
  ActionMap<WordsPayload>[keyof ActionMap<WordsPayload>];

export function stateReducer(state: AppState, action: WordsAction): AppState {
  switch (action.type) {
    case Types.Add:
      return {
        ...state,
        words: [...state.words, action.payload.word],
        rows: handleRows(state, action),
      };

    case Types.Delete:
      return {
        ...state,
        words: state.words.filter((w) => w !== action.payload.word),
        rows: handleRows(state, action),
      };
    case Types.SetLetters:
      return {
        ...state,
        letters: action.payload.letters.sort(),
      };
    case Types.SetTwoLetters:
      return {
        ...state,
        twoLetterWords: parseTwoLetterInput(action.payload.input),
      };
    case Types.SetGrid:
      return {
        ...state,
        rowHeader: parseRowHeader(action.payload.input),
        rows: parseGridInput(action.payload.input),
        letters: parseGridInput(action.payload.input)
          .slice(0, -1) //remove the "Σ" character
          .map((it) => it.letter),
      };
    default:
      return state;
  }
}

function handleRows(state: AppState, action: WordsAction): Rows[] {
  if (action.type === Types.Add || action.type === Types.Delete) {
    const letter = action.payload.word.charAt(0).toUpperCase();
    const letterLength = action.payload.word.length;
    const findFreq = state.rowHeader.findIndex(
      (freq) => freq === `${letterLength}`
    );
    const lastIndex = state.rows.length - 1;
    //todo; add bounds so user doesn't go below 0
    return state.rows.map((row, rowIndex) => {
      if (row.letter.toLocaleUpperCase() === letter || rowIndex === lastIndex) {
        return {
          ...row,
          repeats: row.repeats.map((freq, index) => {
            if (freq >= 0) {
              if (
                action.type === Types.Add &&
                (index === findFreq || index === lastIndex)
              ) {
                return freq - 1;
              }
              if (
                action.type === Types.Delete &&
                (index === findFreq || index === lastIndex)
              ) {
                return freq + 1;
              }
            }
            return freq;
          }),
        };
      }
      return row;
    });
  }
  return state.rows;
}

export function createRows(letters: string[]): Rows[] {
  return [
    ...letters.map((letter) => ({
      letter,
      repeats: Array(7).fill(0),
    })),
    {
      letter: "Σ",
      repeats: Array(7).fill(0),
    },
  ];
}

function parseTwoLetterInput(input: string): TwoLetterWordsType[] {
  const lines = input.trim().split("\n");
  console.log(lines);
  return lines.flatMap((line) => {
    return line
      .trim()
      .split(" ")
      .map((entry) => {
        const [letter, repeat] = entry.split("-");
        return {
          letter,
          repeats: parseInt(repeat),
        };
      });
  });
}

function parseRowHeader(input: string): string[] {
  const firstLine = input.trim().split("\n")[0];
  const headers = firstLine.split("\t").map((header) => header.trim());
  const endIndex = headers.indexOf("Σ");
  if (endIndex !== -1) {
    return headers.slice(0, endIndex + 1);
  }
  return headers;
}

function parseGridInput(input: string): Rows[] {
  const lines = input.trim().split("\n");
  return lines.slice(1).map((line) => {
    const [letterPart, ...nums] = line.split("\t");
    const letter = letterPart.replace(":", "").trim();
    const repeats = nums.map((n) => (n === "-" ? 0 : parseInt(n)));
    return { letter, repeats };
  });
}
