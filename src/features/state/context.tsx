import React, { createContext, useContext, useReducer } from "react";
import { AppState, Rows } from "../../types";
import { WordsAction, stateReducer } from "./reducers";

const defaultRowHeader = ["4", "5", "6", "7", "8", "9", "Σ"];
const defaultRepeats = Array(7).fill(0);
export const defaultRows: Rows[] = Array.from({ length: 7 }, () => ({
  letter: "",
  repeats: [...defaultRepeats],
}));
const initialState: AppState = {
  words: [],
  letters: [],
  rowHeader: defaultRowHeader,
  rows: defaultRows,
  twoLetterWords: [],
};
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<WordsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

type AppProps = { children: React.ReactNode };

const AppProvider = ({ children }: AppProps): JSX.Element => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  console.log(state.rows);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
