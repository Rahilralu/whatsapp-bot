import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-2.5-flash"

export async function generateReply(userMessage) {
  try {
    // Gemini 1.5 expects an object, not an array
    const payload = { text: userMessage };
    const result = await model.generateContent(payload);

    // 1️⃣ Try the candidates path (used in 2.5)
    if (result?.response?.candidates?.[0]?.content?.[0]?.text) {
      return result.response.candidates[0].content[0].text;
    }

    // 2️⃣ Try response.text() function (used in some versions)
    if (typeof result?.response?.text === "function") {
      return result.response.text();
    }

    // 3️⃣ Try response.text property directly
    if (result?.response?.text) {
      return result.response.text;
    }

    // Fallback if none match
    console.error("Unexpected Gemini response:", result);
    return "⚠️ Sorry, I couldn’t process your request right now.";

  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ Sorry, I couldn’t process your request right now.";
  }
}
