import { Status } from "@/interface/models";

interface LetterBoxProps {
  letter: string;
  status: Status;
}

const BG_STATUS = {
  BLACK: "bg-gray-600",
  GREEN: "bg-green-600",
  YELLOW: "bg-yellow-600",
};

export default function LetterBox(props: LetterBoxProps) {
  return (
    <div
      className={`box-border border-2 border-gray-300 ${
        props.status !== "GRAY" &&
        BG_STATUS[props.status].concat(" text-background border-none")
      } size-16 
    p-4 flex items-center ${
      props.letter !== "" &&
      props.status === "GRAY" &&
      "border-gray-600 animate-pop"
    } justify-center`}
    >
      <span className="font-bold text-4xl">{props.letter}</span>
    </div>
  );
}
