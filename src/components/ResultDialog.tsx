"use client";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useEffect, useState } from "react";
import { useAnswerContext } from "@/context/AnswerContext";

export default function ResultDialog() {
  const { finished, setFinished, answer, success } = useAnswerContext();

  return (
    <Dialog open={finished} onOpenChange={setFinished}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This is your result</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {success ? (
            <p>Selamat anda berhasil menyelesaikan KATA-in hari ini</p>
          ) : (
            <p>Anda gagal, batas percobaan sudah habis</p>
          )}
          <p>
            KATA hari ini adalah <span className="font-bold">{answer}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
