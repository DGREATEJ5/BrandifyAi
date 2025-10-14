import { NextResponse } from "next/server";

const EXTERNAL_API =
  "https://pb1aooswk7.execute-api.ap-southeast-1.amazonaws.com/prod/generate_snippet_and_keywords";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get("prompt") ?? "";

    // call the AWS API from the server side (no CORS issue)
    const res = await fetch(`${EXTERNAL_API}?prompt=${encodeURIComponent(prompt)}`);

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
