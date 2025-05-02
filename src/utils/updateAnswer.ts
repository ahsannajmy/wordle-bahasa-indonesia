import { Guess, Status } from "@/interface/models";

export const updateStatus = (input: string, letterBaseline: string): Status => {
  if (input === letterBaseline) {
    return "GREEN";
  }
  return "GRAY";
};

export const updateGuess = (
  posH: number,
  posV: number,
  letter: string,
  guesses: Guess[][]
) => {
  const newGuesses = guesses.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (rowIndex === posV && cellIndex === posH) {
        return {
          ...cell,
          letter: letter,
          justTyped: letter !== "", // backspace or remove word set to false so that animate pop not shown
        };
      } else if (rowIndex === posV) {
        return {
          ...cell,
          justTyped: false,
        };
      }
      return cell;
    })
  );
  return newGuesses;
};

export const finalResult = (guess: Guess[]) => {
  return guess.every((letter) => letter.status === "GREEN");
};
