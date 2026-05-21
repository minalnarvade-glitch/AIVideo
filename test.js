const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "YOUR_KEY_HERE",
});

async function run() {
  const res = await groq.chat.completions.create({
    messages: [{ role: "user", content: "hello" }],
    model: "llama-3.1-8b-instant",
  });

  console.log(res.choices[0].message.content);
}

run();