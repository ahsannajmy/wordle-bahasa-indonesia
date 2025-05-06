"use client";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useEffect, useState } from "react";
import { useAnswerContext } from "@/context/AnswerContext";

export default function ResultDialog() {
  const { finished, setFinished, answer, success, answerAttribute } =
    useAnswerContext();

  return (
    <Dialog open={finished} onOpenChange={setFinished}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {success
              ? "Selamat anda berhasil menyelesaikan KATA-in hari ini"
              : "Anda gagal, batas percobaan sudah habis"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div>
            <p>
              KATA hari ini adalah <span className="font-bold">{answer}</span>
            </p>
            <p>{answerAttribute.arti}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
