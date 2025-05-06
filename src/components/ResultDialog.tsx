"use client";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useAnswerContext } from "@/context/AnswerContext";
import decodedHTML from "@/utils/htmlDecode";

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
          </div>
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: decodedHTML(answerAttribute.arti),
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
