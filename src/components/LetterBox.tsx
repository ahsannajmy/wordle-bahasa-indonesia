interface LetterBoxProps {
  letter: string;
  styleCondition: string;
  justTyped: boolean;
  index: number;
  checked: boolean;
}

export default function LetterBox(props: LetterBoxProps) {
  return (
    <div
      className={`box-border border-2 border-gray-300 size-16 p-4 flex items-center justify-center 
        ${props.justTyped ? "animate-pop" : ""} 
        ${props.styleCondition} 
        ${props.checked ? `animate-flipV` : ""}`}
      style={{
        animationDelay: props.checked ? `${props.index * 0.5}s` : undefined,
      }}
    >
      <span className="font-bold text-4xl">{props.letter}</span>
    </div>
  );
}
