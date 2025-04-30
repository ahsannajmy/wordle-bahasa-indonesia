"use client";

import { Delete } from "lucide-react";

interface KeyboardBoxProps {
  letter: string;
  keyboadClick: (word: string) => void;
  statusStyle: string;
}

export default function KeyboardBox(props: KeyboardBoxProps) {
  return (
    <div
      className={`w-12 h-14 p-2 rounded-sm flex items-center justify-center cursor-pointer ${
        props.statusStyle
      } ${
        props.letter === "ENTER" || props.letter === "<=" ? "text-xs w-20" : ""
      }`}
      onClick={() => props.keyboadClick(props.letter)}
    >
      {props.letter === "<=" ? (
        <Delete />
      ) : (
        <span className="font-bold">{props.letter}</span>
      )}
    </div>
  );
}
