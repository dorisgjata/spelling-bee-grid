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