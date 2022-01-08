export interface GridType {
    letters: Letter[],
    rowHeader: Letter[],
    rows?: Rows[]
    twoLetterWords?: TwoLetterWords[]
}
export interface Rows {
    letter: Letter,
    repeats: Repeat[],
}

export interface TwoLetterWords {
    letter: Letter,
    repeat: Repeat,
}
export type Letter = string;
export type Repeat = number;

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
};