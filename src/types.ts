export interface AppState {
  letters: string[];
  rowHeader: string[];
  rows: Rows[];
  twoLetterWords: TwoLetterWordsType[];
  words: string[];
}
export interface Rows {
  letter: string;
  repeats: number[];
}
export interface TwoLetterWordsType {
  letter: string;
  repeats: number;
}
export enum Types {
  Add = "ADD",
  Delete = "DELETE",
  SetLetters = "SET_LETTERS",
  SetTwoLetters = "SET_TWO_LETTERS",
  SetGrid = "SET_GRID",
}
