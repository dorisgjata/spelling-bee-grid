import { Letter, Rows } from "../../types";

export type AppState = {
    words: WordsType,
    rows: RowsType
};
export type WordsType = string[];
export type RowsType = {
    letter: Letter,
    repeats: number[]
}[];

export enum Types {
    Add = 'add',
    Delete = 'delete',
    // Decrement = 'decrement',
    // Increment = 'increment',
};

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

export type WordsPayload = {
    [Types.Add]: {
        word: string
    },
    [Types.Delete]: {
        word: string
    }
}

// export type RowsPayload = {
//     [Types.Increment]: {
//         word: string,
//     },
//     [Types.Decrement]: {
//         word: string,
//     }
// }
export type WordsAction = ActionMap<WordsPayload>[keyof ActionMap<WordsPayload>];

export function wordsReducer(state: AppState, action: WordsAction) {
    switch (action.type) {
        case Types.Add:
            return { words: [...state.words, action.payload.word], rows: handleRows(state.rows, action) };
        case Types.Delete:
            const remaining = state.words.filter((word: string) => word !== action.payload.word);
            return { words: remaining, rows: handleRows(state.rows, action) };
        default:
            return state;
    }
}
// export type RowsAction = ActionMap<RowsPayload>[keyof ActionMap<RowsPayload>];

// export function rowsReducer(state: RowsType, action: WordsAction | RowsAction) {
//     switch (action.type) {
//         case Types.Decrement:
//             return handleRows(state, action);
//         case Types.Increment:
//             return handleRows(state, action);
//         default:
//             return state;
//     }
// }

function handleRows(state: RowsType, action: WordsAction) {
    const letter = action.payload.word.charAt(0).toUpperCase();
    const frequency = action.payload.word.length;

    return state.map((row: {
        letter: Letter,
        repeats: number[]
    }) => {
        if (row.letter === letter) {
            const updatedRow = {
                ...row,
                repeats: row.repeats.map((freq: number) => {
                    if (freq === frequency && action.type === Types.Add) {
                        return freq - 1;
                    };
                    if (freq === frequency && action.type === Types.Delete) {
                        return freq + 1;
                    };
                    return freq;
                })
            };
            console.log(updatedRow);
            return updatedRow;
        }
        return row;
    });
}


// export const mainReducer = (state: AppState, action: WordsAction | RowsAction) => ({
//     words: wordsReducer(state.words, action),
//     rows: rowsReducer(state.rows, action),
// });