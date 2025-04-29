"use client";
import KeyboardBox from "@/components/KeyboardBox";
import { useAnswerContext } from "@/context/AnswerContext";
import { Guess } from "@/interface/models";
import { checkAnswer } from "@/utils/checkAnswer";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

const cols = {
  row_1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  row_2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  row_3: ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "<="],
};

const updateGuess = (
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
        };
      }
      return cell;
    })
  );
  return newGuesses;
};

const getWord = (letters: Guess[]) => {
  const words = letters.map((letter) => letter.letter).join("");
  return words;
};

export default function Keyboard() {
  const { guesses, setPosH, setPosV, setGuesses, posH, posV, answer } =
    useAnswerContext();

  const checkWord = async (word: string) => {
    const response = await fetch(
      `https://kbbi.raf555.dev/api/v1/entry/${word}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.ok;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (key === "ENTER") {
      if (getWord(guesses[posV]).length != 5) {
        toast.error("Fill the answer properly");
        return;
      }
      const isWord = checkWord(
        guesses[posV].map((guess) => guess.letter).join("")
      );
      if (!isWord) {
        toast.error("Not a word");
      }
      const newGuessesStatus = checkAnswer(posV, guesses, answer);
      setGuesses(newGuessesStatus);
      setPosH(0);
      setPosV(posV + 1);
    } else if (key === "BACKSPACE" && posH !== 0) {
      const newPosH = posH - 1;
      const newGuesses = updateGuess(newPosH, posV, "", guesses);
      setPosH(newPosH);
      setGuesses(newGuesses);
    } else if (posH <= 4 && /^[A-Z]$/.test(key)) {
      const newGuesses = updateGuess(posH, posV, key, guesses);
      setGuesses(newGuesses);
      setPosH(posH + 1);
    }
  };

  const handleKeyboardClick = (word: string) => {
    if (word === "ENTER") {
    } else if (word === "<=" && posH !== 0) {
      const newPosH = posH - 1;
      const newGuesses = updateGuess(newPosH, posV, "", guesses);
      setPosH(newPosH);
      setGuesses(newGuesses);
    } else {
      if (posH <= 4) {
        const newGuesses = updateGuess(posH, posV, word, guesses);
        setGuesses(newGuesses);
        setPosH(posH + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [posH, posV, guesses]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-2">
        {(Object.keys(cols) as Array<keyof typeof cols>).map(
          (listOfWords, index) => (
            <div className="flex gap-2" key={index}>
              {cols[listOfWords].map((word, index) => (
                <KeyboardBox
                  letter={word}
                  key={index}
                  keyboadClick={handleKeyboardClick}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
