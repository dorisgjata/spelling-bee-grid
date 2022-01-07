import React, { createContext, useReducer } from "react";
import { AppState, wordsReducer, WordsAction } from "./reducers";
import data from '../../data/12-27-2021.json';

const initialState: AppState = {
    words: [],
    rows: data.rows,
};
const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<WordsAction>;
}>({
    state: initialState,
    dispatch: () => null
});

type AppProps = { children: React.ReactNode };
const AppProvider = ({ children }: AppProps): JSX.Element => {
    const [state, dispatch] = useReducer(wordsReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };