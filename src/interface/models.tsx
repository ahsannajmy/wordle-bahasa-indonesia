export type Status = "YELLOW" | "BLACK" | "GREEN" | "GRAY";

export type Alphabet =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type KeyboardStatus = {
  [key in Alphabet]: Status;
};
export interface Guess {
  letter: string;
  status: Status;
  justTyped: boolean;
}

export interface Words {
  arti: string;
  type: number;
  word: string;
  _id: number;
}
