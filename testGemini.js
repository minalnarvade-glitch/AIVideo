const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("PUT_YOUR_NEW_KEY_HERE");

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent("Say hello");
    console.log("✅ SUCCESS:", result.response.text());

  } catch (err) {
    console.error("❌ TEST ERROR:", err);
  }
}

test();