import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateReply(userMessage) {
  try {
    const result = await model.generateContent([{ text: userMessage }]);

    // Try accessing different places where Gemini stores the text
    if (result?.response?.candidates?.[0]?.content?.[0]?.text) {
      return result.response.candidates[0].content[0].text;
    } else if (typeof result.response.text === "function") {
      return result.response.text();
    } else if (result?.response?.text) {
      return result.response.text;
    } else {
      console.error("Unexpected Gemini response:", result);
      return "⚠️ Sorry, I couldn’t process your request right now.";
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ Sorry, I couldn’t process your request right now.";
  }
}

