"use client";

import LetterBox from "@/components/LetterBox";
import { useAnswerContext } from "@/context/AnswerContext";

export default function Answer() {
  const { guesses } = useAnswerContext();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2">
        {guesses.map((letters, index) => (
          <div className="flex gap-2" key={index}>
            {letters.map((guess, index) => (
              <LetterBox
                key={index}
                letter={guess.letter}
                status={guess.status}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
