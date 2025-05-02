import ResultDialog from "@/components/ResultDialog";
import Answer from "@/section/AnswerSection";
import Header from "@/section/HeaderSection";
import Keyboard from "@/section/KeyboardSection";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Header />
        <ResultDialog />
        <Answer />
        <Keyboard />
      </div>
    </div>
  );
}
