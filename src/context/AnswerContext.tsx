"use client";
import { Alphabet, Guess, KeyboardStatus } from "@/interface/models";
import { createContext, useContext, useEffect, useState } from "react";

interface AnswerContextType {
  answer: string;
  checked: boolean;
  setChecked: (val: boolean) => void;
  finished: boolean;
  setFinished: (val: boolean) => void;
  isError: boolean;
  keyboardStatus: KeyboardStatus;
  setKeyboardStatus: (val: KeyboardStatus) => void;
  setIsError: (cond: boolean) => void;
  posH: number;
  setPosH: (val: number) => void;
  posV: number;
  setPosV: (val: number) => void;
  guesses: Guess[][];
  setGuesses: (val: Guess[][]) => void;
}

const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export function AnswerProvider({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isError, setIsError] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatus>(
    () =>
      Object.fromEntries(
        Array.from({ length: 26 }, (_, i) => [
          String.fromCharCode(65 + i) as Alphabet,
          "GRAY",
        ])
      ) as KeyboardStatus
  );
  const [answer, setAnswer] = useState("");
  const [posH, setPosH] = useState(0);
  const [posV, setPosV] = useState(0);
  const [guesses, setGuesses] = useState<Guess[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: "",
        status: "GRAY",
        justTyped: false,
      }))
    )
  );

  useEffect(() => {
    async function getTodayAnswer() {
      const response = await fetch("/api/words");
      const data = await response.json();
      const todayWord: string = data.word;
      console.log(data);
      setAnswer(todayWord.toUpperCase());
    }
    getTodayAnswer();
  }, []);

  return (
    <AnswerContext.Provider
      value={{
        checked,
        setChecked,
        finished,
        setFinished,
        posH,
        setPosH,
        posV,
        setPosV,
        guesses,
        setGuesses,
        answer,
        isError,
        setIsError,
        keyboardStatus,
        setKeyboardStatus,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export function useAnswerContext() {
  const context = useContext(AnswerContext);
  if (!context) throw new Error("Context not exist");
  return context;
}
