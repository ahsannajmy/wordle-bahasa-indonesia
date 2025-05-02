"use client";

import LetterBox from "@/components/LetterBox";
import { useAnswerContext } from "@/context/AnswerContext";
import { Status } from "@/interface/models";

export default function Answer() {
  const { guesses, posV, isError, checked } = useAnswerContext();
  const BG_STATUS = {
    BLACK: "bg-gray-600",
    GREEN: "bg-green-600",
    YELLOW: "bg-yellow-600",
  };

  const letterStyleCondition = (
    status: Status,
    letter: string,
    rowIndex: number
  ) => {
    if (isError && rowIndex === posV) {
      return "border-red-600 text-red-600 animate-shake";
    }
    if (status !== "GRAY") {
      return BG_STATUS[status].concat(" text-background border-none");
    }
    if (letter !== "" && status === "GRAY") {
      return "border-gray-600";
    }
    return "";
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2">
        {guesses.map((letters, rowIndex) => (
          <div className="flex gap-2" key={rowIndex}>
            {letters.map((guess, cellIndex) => (
              <LetterBox
                key={cellIndex}
                letter={guess.letter}
                styleCondition={letterStyleCondition(
                  guess.status,
                  guess.letter,
                  rowIndex
                )}
                justTyped={guess.justTyped}
                index={cellIndex}
                checked={checked && rowIndex === posV}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
