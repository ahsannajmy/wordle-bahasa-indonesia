"use client";
import { Guess } from "@/interface/models";
import { createContext, useContext, useEffect, useState } from "react";

interface AnswerContextType {
  answer: string;
  isError: boolean;
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
  const [isError, setIsError] = useState(false);
  const [answer, setAnswer] = useState("");
  const [posH, setPosH] = useState(0);
  const [posV, setPosV] = useState(0);
  const [guesses, setGuesses] = useState<Guess[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: "",
        status: "GRAY",
      }))
    )
  );

  useEffect(() => {
    async function getTodayAnswer() {
      const response = await fetch("/api/words");
      const data = await response.json();
      const todayWord: string = data.word;
      setAnswer(todayWord.toUpperCase());
    }
    getTodayAnswer();
  }, []);

  return (
    <AnswerContext.Provider
      value={{
        posH,
        setPosH,
        posV,
        setPosV,
        guesses,
        setGuesses,
        answer,
        isError,
        setIsError,
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
