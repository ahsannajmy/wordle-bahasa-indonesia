export type Status = "YELLOW" | "BLACK" | "GREEN" | "GRAY";

export interface Guess {
  letter: string;
  status: Status;
}
