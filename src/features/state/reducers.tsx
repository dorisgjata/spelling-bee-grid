import { Letter, Rows } from "../../types";

const initialState = { words: [], repeats: [] };

interface State {
    words: string[],
    rows: {
        letter: Letter,
        repeats: number[]
    }[],
}
interface WordsAction {
    type: 'add' | 'delete',
    payload: {
        word: string
    }
}

interface RowsAction {
    type: 'increment' | 'decrement',
    payload: {
        word: string
    }
}
export function wordsReducer(state: State, action: WordsAction) {
    switch (action.type) {
        case 'add':
            return { ...state, words: [...state.words, action.payload.word] };
        case 'delete':
            const remaining = state.words.filter((word: string) => word !== action.payload.word);
            return { ...state, words: remaining };
        default:
            state;

    }
}
export function reducer(state: State, action: RowsAction) {
    switch (action.type) {
        case 'decrement':
            return { ...state, rows: handleRows(state, action) };
        case 'increment':
            return { ...state, rows: handleRows(state, action) };
        default:
            state;

    }
}

function handleRows(state: State, action: RowsAction) {
    const letter = action.payload.word.charAt(0).toUpperCase();
    const frequency = action.payload.word.length;

    return state.rows.map((row: {
        letter: Letter,
        repeats: number[]
    }) => {
        if (row.letter === letter) {
            const updatedRow = {
                ...row,
                repeats: row.repeats.map((freq: number) => {
                    if (freq === frequency && action.type === 'decrement') {
                        return freq - 1;
                    };
                    if (freq === frequency && action.type === 'increment') {
                        return freq + 1;
                    };
                    return freq;
                })
            };
            return updatedRow;
        }
        return row;
    });
}