import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");

  if (!word) {
    return NextResponse.json(
      {
        success: false,
        message: "Word is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`https://kbbi.raf555.dev/api/v1/entry/${word}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
