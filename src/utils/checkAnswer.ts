import { Guess, Status } from "@/interface/models";

export function checkAnswer(posV: number, guesses: Guess[][], answer: string) {
  const updateStatus = (
    input: string,
    letterBaseline: string,
    wordBaseline: string
  ): Status => {
    if (input === letterBaseline) {
      return "GREEN";
    }
    return "GRAY";
  };

  const listGreenWord: string[] = [];

  const greenGuesses = guesses.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (rowIndex === posV) {
        const updatedStatus = updateStatus(
          cell.letter,
          answer.charAt(cellIndex),
          answer
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

  return newGuessesStatus;
}
