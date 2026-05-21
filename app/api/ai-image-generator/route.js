import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {

    const result = await axios.post(
      "https://www.aigurulab.tech/api/generate-image",
      {
        input: "A cute cat"
      },
      {
        headers: {
          "x-api-key": process.env.AIGURULAB_API_KEY,
          "Content-Type": "application/json",
        }
      }
    );

    console.log(result.data);

    return NextResponse.json(result.data);

  } catch (err) {

    console.log("FULL ERROR OBJECT:");
console.log(err);

console.log("STATUS:");
console.log(err.response?.status);

console.log("HEADERS:");
console.log(err.response?.headers);

console.log("DATA:");
console.log(err.response?.data);

return NextResponse.json(
{
error: err.message,
status: err.response?.status,
details: err.response?.data
},
      { status: 500 }
    );
  }
}