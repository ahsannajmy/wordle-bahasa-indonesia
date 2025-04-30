"use client";
import KeyboardBox from "@/components/KeyboardBox";
import { useAnswerContext } from "@/context/AnswerContext";
import { Alphabet, Guess } from "@/interface/models";
import { checkAnswer } from "@/utils/checkAnswer";
import { useEffect } from "react";
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

const getWord = (letters: Guess[]) => {
  const words = letters.map((letter) => letter.letter).join("");
  return words;
};

const keyboardStatusStyle = {
  GRAY: "bg-gray-300 text-foreground",
  BLACK: "bg-gray-600 text-background",
  GREEN: "bg-green-600 text-background",
  YELLOW: "bg-yellow-600 text-background",
};

export default function Keyboard() {
  const {
    guesses,
    setPosH,
    setPosV,
    setGuesses,
    posH,
    posV,
    answer,
    setIsError,
    keyboardStatus,
    setKeyboardStatus,
  } = useAnswerContext();

  const animateError = () => {
    setIsError(true);
    return;
  };

  const checkWord = async (word: string) => {
    const response = await fetch(`/api/word-check?word=${word}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  };

  const handleKeyPress = async (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (key === "ENTER") {
      const input = guesses[posV].map((guess) => guess.letter).join("");
      if (getWord(guesses[posV]).length != 5) {
        animateError();
        toast.error("Isi kata dengan lengkap");
        return;
      }
      const isWord = await checkWord(input);
      if (!isWord) {
        animateError();
        toast.error(`${input} tidak terdaftar di KBBI`);
        return;
      }
      const { newGuessesStatus, newKeyboardStatus } = checkAnswer(
        posV,
        guesses,
        answer,
        keyboardStatus
      );
      setGuesses(newGuessesStatus);
      setKeyboardStatus(newKeyboardStatus);
      setPosH(0);
      setPosV(posV + 1);
    } else if (key === "BACKSPACE" && posH !== 0) {
      setIsError(false);
      const newPosH = posH - 1;
      const newGuesses = updateGuess(newPosH, posV, "", guesses);
      setPosH(newPosH);
      setGuesses(newGuesses);
    } else if (posH <= 4 && /^[A-Z]$/.test(key)) {
      setIsError(false);
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
                  statusStyle={
                    keyboardStatusStyle[keyboardStatus[word as Alphabet]] ||
                    "bg-gray-300"
                  }
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
