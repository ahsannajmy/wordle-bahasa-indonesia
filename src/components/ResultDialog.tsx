"use client";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useEffect, useState } from "react";
import { useAnswerContext } from "@/context/AnswerContext";

export default function ResultDialog() {
  const { finished, setFinished } = useAnswerContext();

  return (
    <Dialog open={finished} onOpenChange={setFinished}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This is your result</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
