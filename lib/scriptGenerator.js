

export async function generateScript(prompt) {
  try {

    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Video Generator"
        },
        body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.error?.message || "OpenRouter API Error"
      );
    }

    return data.choices?.[0]?.message?.content || "";

  } catch (error) {

    console.log("🔥 OPENROUTER ERROR:", error);

    throw error;
  }
}