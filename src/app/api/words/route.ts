import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

interface Words {
  arti: string;
  type: number;
  word: string;
  _id: number;
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), "src/data/available-word.json");
    const contents = await readFile(filePath, "utf-8");
    const words: Words[] = JSON.parse(contents).dictionary;
    const todayWord: Words = words[Math.floor(Math.random() * words.length)];
    return NextResponse.json(todayWord);
  } catch (error) {
    return NextResponse.json(error);
  }
}
