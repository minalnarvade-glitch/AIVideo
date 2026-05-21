import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {

  const data = await req.json();

  console.log("REQ DATA:", data);

  await inngest.send({
    name: "generate-video-data",
    data: data,
  });

  return NextResponse.json({
    success: true,
  });
}