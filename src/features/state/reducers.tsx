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
};

export type WordsAction =
  ActionMap<WordsPayload>[keyof ActionMap<WordsPayload>];

export function stateReducer(state: AppState, action: WordsAction): AppState {
  switch (action.type) {
    case Types.Add:
      return {
        ...state,
        words: [...state.words, action.payload.word],
        rows: handleRows(state.rows, action),
      };

    case Types.Delete:
      return {
        ...state,
        words: state.words.filter((w) => w !== action.payload.word),
        rows: handleRows(state.rows, action),
      };
    case Types.SetLetters:
      const letters = action.payload.letters;

      return {
        ...state,
        letters,
        rows: createRows(letters),
        twoLetterWords: generateTwoLetterWords(letters),
      };
    default:
      return state;
  }
}

function handleRows(state: Rows[], action: WordsAction): Rows[] {
  if (action.type === Types.Add || action.type === Types.Delete) {
    const letter = action.payload.word.charAt(0).toUpperCase();
    const frequency = action.payload.word.length;

    return state.map((row) => {
      if (row.letter === letter) {
        return {
          ...row,
          repeats: row.repeats.map((freq) => {
            if (freq === frequency && action.type === Types.Add) {
              return freq - 1;
            }
            if (freq === frequency && action.type === Types.Delete) {
              return freq + 1;
            }
            return freq;
          }),
        };
      }
      return row;
    });
  }

  return state;
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

function generateTwoLetterWords(letters: string[]): TwoLetterWordsType[] {
  const combos: TwoLetterWordsType[] = [];

  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      if (i !== j) {
        combos.push({
          letter: letters[i] + letters[j],
          repeats: 0,
        });
      }
    }
  }

  return combos;
}
