import { today } from "@/utils/placeholder";
import client from "@/utils/redis";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { Words } from "@/interface/models";
import { error } from "console";

export async function GET() {
  try {
    const redisKey = `today-word:${today}`;

    const todayWord = await client.hGetAll(redisKey); // check if today word already generated
    if (Object.keys(todayWord).length > 0) {
      return NextResponse.json({
        arti: todayWord.arti,
        type: parseInt(todayWord.type as string),
        word: todayWord.word,
        _id: parseInt(todayWord._id as string),
      });
    }

    const filePath = join(process.cwd(), "src/data/available-word.json");
    const contents = await readFile(filePath, "utf-8");
    const words: Words[] = JSON.parse(contents).dictionary;

    const usedWords = await client.sMembers("used-words");
    const unusedWords = words.filter((w) => !usedWords.includes(w.word)); // filter out used words from the dataset

    if (unusedWords.length === 0) {
      return NextResponse.json(
        {
          error: "No unused words left",
        },
        {
          status: 500,
        }
      );
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];

    await client.hSet(redisKey, {
      // set today word
      arti: randomWord.arti,
      type: randomWord.type,
      word: randomWord.word,
      _id: randomWord._id,
    });

    await client.sAdd("used-words", randomWord.word); // set new word to used words
    return NextResponse.json(randomWord);
  } catch (error) {
    return NextResponse.json(error);
  }
}
