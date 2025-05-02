import { todayWord } from "@/utils/placeholder";
import client from "@/utils/redis";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { Words } from "@/interface/models";

export async function GET() {
  try {
    const checkRedisWord = await client.hGetAll(todayWord);
    if (checkRedisWord && Object.keys(checkRedisWord).length > 0) {
      return NextResponse.json({
        arti: checkRedisWord.arti,
        type: parseInt(checkRedisWord.type as string),
        word: checkRedisWord.word,
        _id: parseInt(checkRedisWord._id as string),
      });
    }
    const filePath = join(process.cwd(), "src/data/available-word.json");
    const contents = await readFile(filePath, "utf-8");
    const words: Words[] = JSON.parse(contents).dictionary;
    const randomWord: Words = words[Math.floor(Math.random() * words.length)];
    await client.hSet(todayWord, {
      arti: randomWord.arti,
      type: randomWord.type,
      word: randomWord.word,
      _id: randomWord._id,
    });
    return NextResponse.json(randomWord);
  } catch (error) {
    return NextResponse.json(error);
  }
}
