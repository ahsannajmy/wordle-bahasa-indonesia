import { Alphabet, Guess, KeyboardStatus, Status } from "@/interface/models";
import { updateStatus } from "./updateAnswer";

export function checkAnswer(
  posV: number, // posisi row sekarang
  guesses: Guess[][], // kumpulan kata guess
  answer: string, // baseline jawaban
  keyboardStatus: KeyboardStatus // status keyboard
) {
  const listGreenWord: string[] = [];

  const greenGuesses = guesses.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (rowIndex === posV) {
        const updatedStatus = updateStatus(
          cell.letter,
          answer.charAt(cellIndex)
        );
        if (updatedStatus === "GREEN") listGreenWord.push(cell.letter);
        return {
          ...cell,
          status: updatedStatus,
        };
      }
      return cell;
    })
  ) as Guess[][];

  const newGuessesStatus = greenGuesses.map((row, rowIndex) =>
    row.map((cell, _) => {
      if (rowIndex === posV && cell.status !== "GREEN") {
        if (
          answer.includes(cell.letter) &&
          !listGreenWord.includes(cell.letter)
        ) {
          return {
            ...cell,
            status: "YELLOW",
          };
        } else {
          return {
            ...cell,
            status: "BLACK",
          };
        }
      }
      return cell;
    })
  ) as Guess[][];

  newGuessesStatus[posV].map((letter, _) => {
    if (keyboardStatus[letter.letter as Alphabet] === "GRAY") {
      keyboardStatus[letter.letter as Alphabet] = letter.status;
    } else {
      if (letter.status === "GREEN") {
        keyboardStatus[letter.letter as Alphabet] = letter.status;
      }
    }
  });

  const resetJustTyped = newGuessesStatus.map((row, _) =>
    row.map((cell) => ({
      ...cell,
      justTyped: false,
    }))
  );

  return {
    newGuessesStatus: resetJustTyped,
    newKeyboardStatus: keyboardStatus,
  };
}
