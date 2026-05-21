import { NextResponse } from "next/server";
import { generateScript } from "@/lib/scriptGenerator";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const prompt = `
Generate EXACTLY 3 different short video scripts.

Rules:
- Each script must be 80–120 words
- No headings
- No numbering (no Script 1, Script 2)
- No emojis
- No bullet points

Return ONLY JSON:
{
  "scripts": [
    "script 1",
    "script 2",
    "script 3"
  ]
}

Topic: ${topic}
`;

  
    const aiText = await generateScript(prompt);

    console.log("RAW AI:", aiText);

    if (!aiText) {
      throw new Error("AI returned empty response");
    }

    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    if (!parsed?.scripts) {
      throw new Error("Invalid AI response format");
    }

    return NextResponse.json({
      scripts: parsed.scripts.map((s) => ({
        content: s,
      })),
    });

  } catch (error) {
    console.log("💥 API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to generate script",
        message: error.message,
      },
      { status: 500 }
    );
  }
}